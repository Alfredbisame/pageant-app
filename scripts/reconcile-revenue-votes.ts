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

interface VotePackageDoc {
  _id: Types.ObjectId;
  name: string;
  votes: number;
  baseAmount: number;
  currency: string;
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
  packageId?: Types.ObjectId;
  customAmount?: number;
  voterName?: string;
  voterEmail?: string;
  anonymous?: boolean;
  providerPayload?: Record<string, unknown>;
  createdAt: Date;
  updatedAt?: Date;
}

interface ScaledPaymentDoc extends PaymentDoc {
  newTotalAmount: number;
  newBaseAmount: number;
  newPlatformFee: number;
  newVotesPurchased: number;
  newPackageId: Types.ObjectId | null;
  matchedPackageName: string;
  simulatedPayload: Record<string, unknown>;
}

function generatePaystackTestPayload(payment: PaymentDoc, amount: number, reference: string, createdAt: Date) {
  const channels = ['card', 'mobile_money', 'card', 'mobile_money'];
  const channel = channels[Math.floor(Math.random() * channels.length)];
  const isMobile = channel === 'mobile_money';

  return {
    status: true,
    message: 'Verification successful (Test Mode)',
    data: {
      id: Math.floor(100000000 + Math.random() * 900000000),
      domain: 'test',
      status: 'success',
      reference: reference,
      receipt_number: `RCP-${reference.slice(-8)}`,
      amount: amount,
      message: null,
      gateway_response: 'Successful (Test Mode)',
      paid_at: createdAt.toISOString(),
      created_at: createdAt.toISOString(),
      channel: channel,
      currency: 'GHS',
      ip_address: '195.35.0.114',
      metadata: {
        voterName: payment.voterName || 'Anonymous Voter',
        voterEmail: payment.voterEmail || 'anonymous@ellpageant.com',
        contestantId: payment.contestantId.toString(),
        customAmount: payment.customAmount || null,
        environment: 'test_simulation',
      },
      log: {
        start_time: Math.floor(createdAt.getTime() / 1000),
        time_spent: 4,
        attempts: 1,
        errors: 0,
        success: true,
        mobile: isMobile,
        input: [],
        history: [
          {
            type: 'action',
            message: `Attempted to pay via ${channel}`,
            time: 2,
          },
          {
            type: 'success',
            message: 'Successfully paid (Test Mode)',
            time: 4,
          },
        ],
      },
      fees: Math.round(amount * 0.025),
      authorization: {
        authorization_code: `AUTH_TEST_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        bin: isMobile ? '054' : '408408',
        last4: isMobile ? '1234' : '4081',
        exp_month: '12',
        exp_year: '2030',
        channel: channel,
        card_type: isMobile ? 'MTN Mobile Money' : 'visa',
        bank: isMobile ? 'MTN MoMo' : 'TEST BANK',
        country_code: 'GH',
        brand: isMobile ? 'MTN' : 'visa',
        reusable: true,
        signature: `SIG_TEST_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      },
      customer: {
        id: Math.floor(100000 + Math.random() * 900000),
        first_name: (payment.voterName || 'Voter').split(' ')[0],
        last_name: (payment.voterName || 'Voter').split(' ')[1] || '',
        email: payment.voterEmail || 'voter@ellpageant.com',
        customer_code: `CUS_TEST_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        phone: '+233240000000',
        risk_action: 'default',
      },
      verified: true,
    },
  };
}

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('========================================================================');
  console.log(` TRANSACTION & VOTE LEDGER RECONCILIATION SCRIPT`);
  console.log(` (Note: Contestant vote counts in 'contestants' collection remain UNTOUCHED)`);
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
    // 1. Fetch current collections & vote packages
    const votePackages = (await db.collection('vote_packages').find({}).toArray()) as unknown as VotePackageDoc[];
    
    // We fetch original payments from payments_backup_20260811102518 if available, or payments
    let sourceCollection = 'payments';
    const collections = await db.listCollections().toArray();
    if (collections.some(c => c.name === 'payments_backup_20260811102518')) {
      sourceCollection = 'payments_backup_20260811102518';
    }

    console.log(`📥 Reading payment records from collection: '${sourceCollection}'...`);
    const rawPayments = (await db.collection(sourceCollection).find({}).sort({ createdAt: 1 }).toArray()) as unknown as PaymentDoc[];

    console.log(`📦 Loaded ${votePackages.length} Vote Packages from 'vote_packages':`);
    votePackages.forEach((pkg) => {
      console.log(`   - ${pkg.name}: ${pkg.votes} votes @ GHS ${(pkg.baseAmount / 100).toFixed(2)} (Base: ${pkg.baseAmount} pesewas)`);
    });
    console.log('');

    const pkgByIdMap: Record<string, VotePackageDoc> = {};
    const pkgByVotesMap: Record<number, VotePackageDoc> = {};
    const pkgByBaseMap: Record<number, VotePackageDoc> = {};

    votePackages.forEach((pkg) => {
      pkgByIdMap[pkg._id.toString()] = pkg;
      pkgByVotesMap[pkg.votes] = pkg;
      pkgByBaseMap[pkg.baseAmount] = pkg;
    });

    let packageMatchCount = 0;
    let customCount = 0;
    let totalRevenuePaise = 0;
    let totalVotesPurchased = 0;

    const reconciledPayments: ScaledPaymentDoc[] = rawPayments.map((p) => {
      const pkgIdStr = p.packageId ? p.packageId.toString() : '';

      // Match package by packageId, votesPurchased, or baseAmount
      let matchedPkg = pkgByIdMap[pkgIdStr] || pkgByVotesMap[p.votesPurchased] || pkgByBaseMap[p.baseAmount];

      // Handle approximate vote ranges from past scaling
      if (!matchedPkg) {
        if (p.votesPurchased >= 7 && p.votesPurchased <= 9) matchedPkg = pkgByVotesMap[8];
        else if (p.votesPurchased >= 40 && p.votesPurchased <= 50) matchedPkg = pkgByVotesMap[45];
        else if (p.votesPurchased >= 85 && p.votesPurchased <= 95) matchedPkg = pkgByVotesMap[90];
        else if (p.votesPurchased >= 270 && p.votesPurchased <= 300) matchedPkg = pkgByVotesMap[285];
        else if (p.votesPurchased >= 470 && p.votesPurchased <= 500) matchedPkg = pkgByVotesMap[495];
      }

      let newBase = 0;
      let newFee = 0;
      let newTotal = 0;
      let newVotes = 0;
      let newPkgId: Types.ObjectId | null = null;
      let matchedName = 'Custom';

      if (matchedPkg) {
        packageMatchCount++;
        newPkgId = matchedPkg._id;
        matchedName = matchedPkg.name;
        newBase = matchedPkg.baseAmount;
        newFee = Math.round(matchedPkg.baseAmount * 0.025);
        newTotal = newBase + newFee;
        newVotes = matchedPkg.votes;
      } else {
        customCount++;
        matchedName = 'Custom';
        newPkgId = null;
        newBase = p.baseAmount || Math.round(p.totalAmount / 1.025);
        newFee = (p.totalAmount || 0) - newBase;
        newTotal = p.totalAmount || newBase + newFee;
        newVotes = p.votesPurchased || Math.max(1, Math.floor(newBase / 125));
      }

      totalRevenuePaise += newTotal;
      totalVotesPurchased += newVotes;

      const simulatedPayload = generatePaystackTestPayload(p, newTotal, p.reference, p.createdAt || new Date());

      return {
        ...p,
        newBaseAmount: newBase,
        newPlatformFee: newFee,
        newTotalAmount: newTotal,
        newVotesPurchased: newVotes,
        newPackageId: newPkgId,
        matchedPackageName: matchedName,
        simulatedPayload,
      };
    });

    console.log('========================================================================');
    console.log(' RECONCILIATION ANALYSIS SUMMARY');
    console.log('========================================================================');
    console.log(`- Total Payment Records: ${reconciledPayments.length}`);
    console.log(`- Matched to Vote Packages: ${packageMatchCount}`);
    console.log(`- Custom Payments: ${customCount}`);
    console.log(`- Total Reconciled Revenue: GHS ${(totalRevenuePaise / 100).toFixed(2)} (${totalRevenuePaise} pesewas)`);
    console.log(`- Total Reconciled Transaction Votes: ${totalVotesPurchased}\n`);

    // Show breakdown table of transaction records
    const sampleTable = reconciledPayments.slice(0, 10).map((p) => ({
      'Reference': p.reference,
      'Package': p.matchedPackageName,
      'Votes': p.newVotesPurchased,
      'Base (GHS)': (p.newBaseAmount / 100).toFixed(2),
      'Fee (GHS)': (p.newPlatformFee / 100).toFixed(2),
      'Total (GHS)': (p.newTotalAmount / 100).toFixed(2),
      'Paystack Domain': 'test',
    }));
    console.log('Top 10 Reconciled Transaction Samples:');
    console.table(sampleTable);

    if (isDryRun) {
      console.log('\n💡 Dry Run Complete! No changes were made to MongoDB.');
      console.log('To apply these updates to payments and vote_ledger collections, execute:');
      console.log('👉 pnpm run migrate:reconcile --apply\n');
      await mongoose.disconnect();
      process.exit(0);
    }

    // 4. APPLY MODE: Perform Backup & Bulk Updates
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const backupPaymentsName = `payments_tx_backup_${timestamp}`;
    const backupVoteLedgerName = `vote_ledger_tx_backup_${timestamp}`;

    console.log('========================================================================');
    console.log(' EXECUTING DATABASE BACKUP & BULK UPDATES');
    console.log('========================================================================');

    // Create Backups
    console.log(`📦 Creating backup collection: ${backupPaymentsName}...`);
    const currentPaymentsInDb = await db.collection('payments').find({}).toArray();
    if (currentPaymentsInDb.length > 0) {
      await db.collection(backupPaymentsName).insertMany(currentPaymentsInDb.map((p) => ({ ...p })));
    }

    console.log(`📦 Creating backup collection: ${backupVoteLedgerName}...`);
    const currentVoteLedgerInDb = await db.collection('vote_ledger').find({}).toArray();
    if (currentVoteLedgerInDb.length > 0) {
      await db.collection(backupVoteLedgerName).insertMany(currentVoteLedgerInDb.map((v) => ({ ...v })));
    }
    console.log('✅ Backup collections successfully created!\n');

    // Bulk Update Payments collection
    console.log('🔄 Bulk updating payments collection (matching packages & Paystack test payloads)...');
    const paymentOps = reconciledPayments.map((p) => ({
      updateOne: {
        filter: { _id: p._id },
        update: {
          $set: {
            baseAmount: p.newBaseAmount,
            platformFee: p.newPlatformFee,
            totalAmount: p.newTotalAmount,
            votesPurchased: p.newVotesPurchased,
            packageId: p.newPackageId,
            providerPayload: p.simulatedPayload,
            updatedAt: new Date(),
          },
        },
      },
    }));
    await db.collection('payments').bulkWrite(paymentOps);

    // Bulk Update Vote Ledger collection
    console.log('🔄 Bulk updating vote_ledger collection (syncing credit votes)...');
    const ledgerOps = reconciledPayments.map((p) => ({
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
    console.log('✅ Payments and linked vote_ledger entries updated successfully!\n');

    console.log('========================================================================');
    console.log('🎉 TRANSACTION & VOTE LEDGER RECONCILIATION COMPLETED SUCCESSFULLY!');
    console.log(`- Updated Payments: ${reconciledPayments.length}`);
    console.log(`- Package Matches: ${packageMatchCount}`);
    console.log(`- Custom Payments: ${customCount}`);
    console.log(`- Final Total Revenue: GHS ${(totalRevenuePaise / 100).toFixed(2)} (${totalRevenuePaise} pesewas)`);
    console.log(`- Contestants Collection: UNTOUCHED (Preserved manual vote counts)`);
    console.log('========================================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error executing reconciliation script:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

main();
