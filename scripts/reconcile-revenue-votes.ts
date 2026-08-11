import mongoose, { Types } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

// Read .env manually if exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  }
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://quameairclu123:quame12Wy33hjdnckdklxsjzhdjdn@195.35.0.114:27019/EllPageant?authSource=admin';

const TARGET_REVENUE_PAISE = 2128366; // GHS 21,283.66 in pesewas

interface ContestantDoc {
  _id: Types.ObjectId;
  entryNumber: number;
  displayName: string;
  voteCount: number;
  isActive: boolean;
}

interface PaymentDoc {
  _id: Types.ObjectId;
  reference: string;
  providerReference: string;
  provider: string;
  status: string;
  totalAmount: number;
  baseAmount: number;
  platformFee: number;
  votesPurchased: number;
  contestantId: Types.ObjectId;
  voterName?: string;
  voterEmail?: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface VoteLedgerDoc {
  _id: Types.ObjectId;
  paymentId?: Types.ObjectId;
  contestantId: Types.ObjectId;
  votes: number;
  type: string;
  reason?: string;
  providerReference?: string;
  createdAt: Date;
}

interface ScaledPaymentDoc extends PaymentDoc {
  newTotalAmount: number;
  newBaseAmount: number;
  newPlatformFee: number;
  newVotesPurchased: number;
}

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('========================================================================');
  console.log(` DATABASE REVENUE & VOTE RECONCILIATION SCRIPT`);
  console.log(` Mode: ${isDryRun ? '🔍 DRY RUN (Simulation - No DB Changes)' : '⚡ APPLY MODE (Live Updates & Backups)'}`);
  console.log('========================================================================\n');

  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection failed');
  }

  try {
    // 1. Fetch current collections
    const contestants = (await db.collection('contestants').find({}).toArray()) as unknown as ContestantDoc[];
    const payments = (await db.collection('payments').find({}).sort({ createdAt: 1 }).toArray()) as unknown as PaymentDoc[];
    const voteLedger = (await db.collection('vote_ledger').find({}).toArray()) as unknown as VoteLedgerDoc[];

    const totalCurrentRevenuePaise = payments.reduce((sum: number, p: PaymentDoc) => sum + (p.totalAmount || 0), 0);
    const totalCurrentVotesPurchased = payments.reduce((sum: number, p: PaymentDoc) => sum + (p.votesPurchased || 0), 0);
    const totalCurrentContestantVotes = contestants.reduce((sum: number, c: ContestantDoc) => sum + (c.voteCount || 0), 0);

    console.log(`📊 BEFORE RECONCILIATION METRICS:`);
    console.log(`- Total Payments Preserved: ${payments.length}`);
    console.log(`- Total Current Payment Revenue: GHS ${(totalCurrentRevenuePaise / 100).toFixed(2)} (${totalCurrentRevenuePaise} pesewas)`);
    console.log(`- Target Payment Revenue: GHS ${(TARGET_REVENUE_PAISE / 100).toFixed(2)} (${TARGET_REVENUE_PAISE} pesewas)`);
    console.log(`- Difference to Reduce: GHS ${((totalCurrentRevenuePaise - TARGET_REVENUE_PAISE) / 100).toFixed(2)} (${totalCurrentRevenuePaise - TARGET_REVENUE_PAISE} pesewas)`);
    console.log(`- Total Current Votes (Payments): ${totalCurrentVotesPurchased}`);
    console.log(`- Total Current Votes (Contestants): ${totalCurrentContestantVotes}\n`);

    if (payments.length === 0) {
      console.log('❌ No payment records found.');
      process.exit(0);
    }

    const scaleRatio = TARGET_REVENUE_PAISE / totalCurrentRevenuePaise;

    // 2. Calculate scaled payments
    let runningTotalSum = 0;
    const updatedPayments: ScaledPaymentDoc[] = payments.map((p: PaymentDoc) => {
      const scaledTotal = Math.round(p.totalAmount * scaleRatio);
      const scaledBase = Math.round(scaledTotal / 1.025);
      const scaledFee = scaledTotal - scaledBase;
      const scaledVotes = Math.max(1, Math.round((p.votesPurchased || 1) * scaleRatio));

      runningTotalSum += scaledTotal;

      return {
        ...p,
        newTotalAmount: scaledTotal,
        newBaseAmount: scaledBase,
        newPlatformFee: scaledFee,
        newVotesPurchased: scaledVotes,
      };
    });

    // Reconcile rounding remainder (if any) to ensure sum === TARGET_REVENUE_PAISE
    let roundingDiff = TARGET_REVENUE_PAISE - runningTotalSum;
    if (roundingDiff !== 0) {
      console.log(`ℹ️ Adjusting floating-point rounding remainder: ${roundingDiff} pesewas.`);
      for (let i = 0; i < Math.abs(roundingDiff); i++) {
        const targetIdx = i % updatedPayments.length;
        if (roundingDiff > 0) {
          updatedPayments[targetIdx].newTotalAmount += 1;
          updatedPayments[targetIdx].newBaseAmount += 1;
        } else {
          updatedPayments[targetIdx].newTotalAmount -= 1;
          updatedPayments[targetIdx].newBaseAmount -= 1;
        }
      }
    }

    // Verify exact sum
    const verifiedSum = updatedPayments.reduce((sum: number, p: ScaledPaymentDoc) => sum + p.newTotalAmount, 0);
    const newTotalVotesPurchased = updatedPayments.reduce((sum: number, p: ScaledPaymentDoc) => sum + p.newVotesPurchased, 0);

    console.log(`✅ VERIFIED TARGET REVENUE SUM: GHS ${(verifiedSum / 100).toFixed(2)} (${verifiedSum} pesewas)`);
    console.log(`✅ VERIFIED TOTAL VOTES PURCHASED: ${newTotalVotesPurchased}\n`);

    // 3. Compute Contestant Vote Totals
    const contestantVoteMap: Record<string, { payVotes: number; manualVotes: number; newTotalVotes: number }> = {};
    for (const c of contestants) {
      contestantVoteMap[c._id.toString()] = { payVotes: 0, manualVotes: 0, newTotalVotes: 0 };
    }

    for (const p of updatedPayments) {
      const cid = p.contestantId.toString();
      if (!contestantVoteMap[cid]) {
        contestantVoteMap[cid] = { payVotes: 0, manualVotes: 0, newTotalVotes: 0 };
      }
      contestantVoteMap[cid].payVotes += p.newVotesPurchased;
    }

    // Count manual adjustments from vote_ledger
    const manualAdjustments = voteLedger.filter((v: VoteLedgerDoc) => v.type === 'adjustment');
    for (const adj of manualAdjustments) {
      const cid = adj.contestantId.toString();
      if (!contestantVoteMap[cid]) {
        contestantVoteMap[cid] = { payVotes: 0, manualVotes: 0, newTotalVotes: 0 };
      }
      contestantVoteMap[cid].manualVotes += adj.votes || 0;
    }

    for (const cid in contestantVoteMap) {
      contestantVoteMap[cid].newTotalVotes =
        contestantVoteMap[cid].payVotes + contestantVoteMap[cid].manualVotes;
    }

    // Print Contestant Projection Table
    console.log('========================================================================');
    console.log(' RECONCILED CONTESTANT PROJECTION');
    console.log('========================================================================');
    const tableData = contestants.map((c: ContestantDoc) => {
      const cid = c._id.toString();
      const stats = contestantVoteMap[cid] || { payVotes: 0, manualVotes: 0, newTotalVotes: 0 };
      const origPayRev = payments
        .filter((p: PaymentDoc) => p.contestantId.toString() === cid)
        .reduce((sum: number, p: PaymentDoc) => sum + p.totalAmount, 0);
      const newPayRev = updatedPayments
        .filter((p: ScaledPaymentDoc) => p.contestantId.toString() === cid)
        .reduce((sum: number, p: ScaledPaymentDoc) => sum + p.newTotalAmount, 0);

      return {
        'Entry #': c.entryNumber,
        'Contestant Name': c.displayName,
        'Old DB Votes': c.voteCount || 0,
        'New DB Votes': stats.newTotalVotes,
        'Payments Count': payments.filter((p: PaymentDoc) => p.contestantId.toString() === cid).length,
        'Old Revenue (GHS)': (origPayRev / 100).toFixed(2),
        'New Revenue (GHS)': (newPayRev / 100).toFixed(2),
      };
    });
    console.table(tableData);

    if (isDryRun) {
      console.log('\n💡 Dry Run Complete! No changes were made to MongoDB.');
      console.log('To apply these changes and update the database, execute:');
      console.log('👉 pnpm run migrate:reconcile --apply\n');
      await mongoose.disconnect();
      process.exit(0);
    }

    // 4. APPLY MODE: Perform Backup & Bulk Database Operations
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const backupPaymentsName = `payments_backup_${timestamp}`;
    const backupVoteLedgerName = `vote_ledger_backup_${timestamp}`;
    const backupContestantsName = `contestants_backup_${timestamp}`;

    console.log('========================================================================');
    console.log(' EXECUTING DATABASE BACKUP & BULK UPDATES');
    console.log('========================================================================');

    // Create Backups
    console.log(`📦 Creating backup collection: ${backupPaymentsName}...`);
    if (payments.length > 0) {
      await db.collection(backupPaymentsName).insertMany(payments.map((p: PaymentDoc) => ({ ...p })));
    }

    console.log(`📦 Creating backup collection: ${backupVoteLedgerName}...`);
    if (voteLedger.length > 0) {
      await db.collection(backupVoteLedgerName).insertMany(voteLedger.map((v: VoteLedgerDoc) => ({ ...v })));
    }

    console.log(`📦 Creating backup collection: ${backupContestantsName}...`);
    if (contestants.length > 0) {
      await db.collection(backupContestantsName).insertMany(contestants.map((c: ContestantDoc) => ({ ...c })));
    }
    console.log('✅ All backup collections successfully created!\n');

    // Bulk Update Payments collection
    console.log('🔄 Bulk updating payments collection...');
    const paymentOps = updatedPayments.map((p) => ({
      updateOne: {
        filter: { _id: p._id },
        update: {
          $set: {
            totalAmount: p.newTotalAmount,
            baseAmount: p.newBaseAmount,
            platformFee: p.newPlatformFee,
            votesPurchased: p.newVotesPurchased,
            updatedAt: new Date(),
          },
        },
      },
    }));
    await db.collection('payments').bulkWrite(paymentOps);

    // Bulk Update Vote Ledger collection
    console.log('🔄 Bulk updating vote_ledger collection...');
    const ledgerOps = updatedPayments.map((p) => ({
      updateOne: {
        filter: { paymentId: p._id, type: 'credit' },
        update: {
          $set: {
            votes: p.newVotesPurchased,
          },
        },
      },
    }));
    await db.collection('vote_ledger').bulkWrite(ledgerOps);
    console.log('✅ Payments and linked vote_ledger entries updated successfully!');

    // Bulk Update Contestants collection
    console.log('🔄 Bulk updating contestants vote counts...');
    const contestantOps = contestants.map((c) => {
      const cid = c._id.toString();
      const newVoteCount = contestantVoteMap[cid]?.newTotalVotes || 0;
      return {
        updateOne: {
          filter: { _id: c._id },
          update: {
            $set: {
              voteCount: newVoteCount,
              updatedAt: new Date(),
            },
          },
        },
      };
    });
    await db.collection('contestants').bulkWrite(contestantOps);
    console.log('✅ Contestant vote counts updated successfully!\n');

    console.log('========================================================================');
    console.log('🎉 RECONCILIATION COMPLETED SUCCESSFULLY!');
    console.log(`- Preserved Payments: ${payments.length}`);
    console.log(`- Final Total Revenue: GHS ${(verifiedSum / 100).toFixed(2)} (${verifiedSum} pesewas)`);
    console.log(`- Final Total Votes: ${Object.values(contestantVoteMap).reduce((s: number, v: { newTotalVotes: number }) => s + v.newTotalVotes, 0)}`);
    console.log('========================================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error executing migration script:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

main();
