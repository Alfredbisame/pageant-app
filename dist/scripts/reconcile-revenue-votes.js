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
function generatePaystackTestPayload(payment, amount, reference, createdAt) {
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
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected!');
    const db = mongoose_1.default.connection.db;
    if (!db) {
        throw new Error('Database connection failed');
    }
    try {
        const votePackages = (await db.collection('vote_packages').find({}).toArray());
        let sourceCollection = 'payments';
        const collections = await db.listCollections().toArray();
        if (collections.some(c => c.name === 'payments_backup_20260811102518')) {
            sourceCollection = 'payments_backup_20260811102518';
        }
        console.log(`📥 Reading payment records from collection: '${sourceCollection}'...`);
        const rawPayments = (await db.collection(sourceCollection).find({}).sort({ createdAt: 1 }).toArray());
        console.log(`📦 Loaded ${votePackages.length} Vote Packages from 'vote_packages':`);
        votePackages.forEach((pkg) => {
            console.log(`   - ${pkg.name}: ${pkg.votes} votes @ GHS ${(pkg.baseAmount / 100).toFixed(2)} (Base: ${pkg.baseAmount} pesewas)`);
        });
        console.log('');
        const pkgByIdMap = {};
        const pkgByVotesMap = {};
        const pkgByBaseMap = {};
        votePackages.forEach((pkg) => {
            pkgByIdMap[pkg._id.toString()] = pkg;
            pkgByVotesMap[pkg.votes] = pkg;
            pkgByBaseMap[pkg.baseAmount] = pkg;
        });
        let packageMatchCount = 0;
        let customCount = 0;
        let totalRevenuePaise = 0;
        let totalVotesPurchased = 0;
        const reconciledPayments = rawPayments.map((p) => {
            const pkgIdStr = p.packageId ? p.packageId.toString() : '';
            let matchedPkg = pkgByIdMap[pkgIdStr] || pkgByVotesMap[p.votesPurchased] || pkgByBaseMap[p.baseAmount];
            if (!matchedPkg) {
                if (p.votesPurchased >= 7 && p.votesPurchased <= 9)
                    matchedPkg = pkgByVotesMap[8];
                else if (p.votesPurchased >= 40 && p.votesPurchased <= 50)
                    matchedPkg = pkgByVotesMap[45];
                else if (p.votesPurchased >= 85 && p.votesPurchased <= 95)
                    matchedPkg = pkgByVotesMap[90];
                else if (p.votesPurchased >= 270 && p.votesPurchased <= 300)
                    matchedPkg = pkgByVotesMap[285];
                else if (p.votesPurchased >= 470 && p.votesPurchased <= 500)
                    matchedPkg = pkgByVotesMap[495];
            }
            let newBase = 0;
            let newFee = 0;
            let newTotal = 0;
            let newVotes = 0;
            let newPkgId = null;
            let matchedName = 'Custom';
            if (matchedPkg) {
                packageMatchCount++;
                newPkgId = matchedPkg._id;
                matchedName = matchedPkg.name;
                newBase = matchedPkg.baseAmount;
                newFee = Math.round(matchedPkg.baseAmount * 0.025);
                newTotal = newBase + newFee;
                newVotes = matchedPkg.votes;
            }
            else {
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
            await mongoose_1.default.disconnect();
            process.exit(0);
        }
        const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        const backupPaymentsName = `payments_tx_backup_${timestamp}`;
        const backupVoteLedgerName = `vote_ledger_tx_backup_${timestamp}`;
        console.log('========================================================================');
        console.log(' EXECUTING DATABASE BACKUP & BULK UPDATES');
        console.log('========================================================================');
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
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error executing reconciliation script:', error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=reconcile-revenue-votes.js.map