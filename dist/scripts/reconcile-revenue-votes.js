"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
const MONGODB_URI = process.env.MONGODB_URI ||
    'mongodb://quameairclu123:quame12Wy33hjdnckdklxsjzhdjdn@195.35.0.114:27019/EllPageant?authSource=admin';
const TARGET_REVENUE_PAISE = 2128366;
async function main() {
    const isApply = process.argv.includes('--apply');
    const isDryRun = !isApply;
    console.log('========================================================================');
    console.log(` DATABASE REVENUE & VOTE RECONCILIATION SCRIPT`);
    console.log(` Mode: ${isDryRun ? '🔍 DRY RUN (Simulation - No DB Changes)' : '⚡ APPLY MODE (Live Updates & Backups)'}`);
    console.log('========================================================================\n');
    console.log('Connecting to MongoDB...');
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected!');
    const db = mongoose_1.default.connection.db;
    if (!db) {
        throw new Error('Database connection failed');
    }
    try {
        const contestants = (await db.collection('contestants').find({}).toArray());
        const payments = (await db.collection('payments').find({}).sort({ createdAt: 1 }).toArray());
        const voteLedger = (await db.collection('vote_ledger').find({}).toArray());
        const totalCurrentRevenuePaise = payments.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
        const totalCurrentVotesPurchased = payments.reduce((sum, p) => sum + (p.votesPurchased || 0), 0);
        const totalCurrentContestantVotes = contestants.reduce((sum, c) => sum + (c.voteCount || 0), 0);
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
        let runningTotalSum = 0;
        const updatedPayments = payments.map((p) => {
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
        let roundingDiff = TARGET_REVENUE_PAISE - runningTotalSum;
        if (roundingDiff !== 0) {
            console.log(`ℹ️ Adjusting floating-point rounding remainder: ${roundingDiff} pesewas.`);
            for (let i = 0; i < Math.abs(roundingDiff); i++) {
                const targetIdx = i % updatedPayments.length;
                if (roundingDiff > 0) {
                    updatedPayments[targetIdx].newTotalAmount += 1;
                    updatedPayments[targetIdx].newBaseAmount += 1;
                }
                else {
                    updatedPayments[targetIdx].newTotalAmount -= 1;
                    updatedPayments[targetIdx].newBaseAmount -= 1;
                }
            }
        }
        const verifiedSum = updatedPayments.reduce((sum, p) => sum + p.newTotalAmount, 0);
        const newTotalVotesPurchased = updatedPayments.reduce((sum, p) => sum + p.newVotesPurchased, 0);
        console.log(`✅ VERIFIED TARGET REVENUE SUM: GHS ${(verifiedSum / 100).toFixed(2)} (${verifiedSum} pesewas)`);
        console.log(`✅ VERIFIED TOTAL VOTES PURCHASED: ${newTotalVotesPurchased}\n`);
        const contestantVoteMap = {};
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
        const manualAdjustments = voteLedger.filter((v) => v.type === 'adjustment');
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
        console.log('========================================================================');
        console.log(' RECONCILED CONTESTANT PROJECTION');
        console.log('========================================================================');
        const tableData = contestants.map((c) => {
            const cid = c._id.toString();
            const stats = contestantVoteMap[cid] || { payVotes: 0, manualVotes: 0, newTotalVotes: 0 };
            const origPayRev = payments
                .filter((p) => p.contestantId.toString() === cid)
                .reduce((sum, p) => sum + p.totalAmount, 0);
            const newPayRev = updatedPayments
                .filter((p) => p.contestantId.toString() === cid)
                .reduce((sum, p) => sum + p.newTotalAmount, 0);
            return {
                'Entry #': c.entryNumber,
                'Contestant Name': c.displayName,
                'Old DB Votes': c.voteCount || 0,
                'New DB Votes': stats.newTotalVotes,
                'Payments Count': payments.filter((p) => p.contestantId.toString() === cid).length,
                'Old Revenue (GHS)': (origPayRev / 100).toFixed(2),
                'New Revenue (GHS)': (newPayRev / 100).toFixed(2),
            };
        });
        console.table(tableData);
        if (isDryRun) {
            console.log('\n💡 Dry Run Complete! No changes were made to MongoDB.');
            console.log('To apply these changes and update the database, execute:');
            console.log('👉 pnpm run migrate:reconcile --apply\n');
            await mongoose_1.default.disconnect();
            process.exit(0);
        }
        const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        const backupPaymentsName = `payments_backup_${timestamp}`;
        const backupVoteLedgerName = `vote_ledger_backup_${timestamp}`;
        const backupContestantsName = `contestants_backup_${timestamp}`;
        console.log('========================================================================');
        console.log(' EXECUTING DATABASE BACKUP & BULK UPDATES');
        console.log('========================================================================');
        console.log(`📦 Creating backup collection: ${backupPaymentsName}...`);
        if (payments.length > 0) {
            await db.collection(backupPaymentsName).insertMany(payments.map((p) => ({ ...p })));
        }
        console.log(`📦 Creating backup collection: ${backupVoteLedgerName}...`);
        if (voteLedger.length > 0) {
            await db.collection(backupVoteLedgerName).insertMany(voteLedger.map((v) => ({ ...v })));
        }
        console.log(`📦 Creating backup collection: ${backupContestantsName}...`);
        if (contestants.length > 0) {
            await db.collection(backupContestantsName).insertMany(contestants.map((c) => ({ ...c })));
        }
        console.log('✅ All backup collections successfully created!\n');
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
        console.log(`- Final Total Votes: ${Object.values(contestantVoteMap).reduce((s, v) => s + v.newTotalVotes, 0)}`);
        console.log('========================================================================\n');
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error executing migration script:', error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=reconcile-revenue-votes.js.map