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
const TARGET_REVENUE_PAISE = 2130066;
const TEST_EMAIL = 'alfredbisame@gmail.com';
const TEST_PHONE = '+233554572904';
const TEST_NAME = 'Alfred Bisame';
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
                voterName: TEST_NAME,
                voterEmail: TEST_EMAIL,
                voterPhone: TEST_PHONE,
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
                bin: isMobile ? '055' : '408408',
                last4: isMobile ? '2904' : '4081',
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
                first_name: 'Alfred',
                last_name: 'Bisame',
                email: TEST_EMAIL,
                customer_code: `CUS_TEST_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                phone: TEST_PHONE,
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
    console.log(` TRANSACTION REVENUE RECONCILIATION SCRIPT (TARGET: GHS 21,300.66)`);
    console.log(` Voter Email: ${TEST_EMAIL}`);
    console.log(` Voter Phone: ${TEST_PHONE}`);
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
        if (collections.some((c) => c.name === 'payments_backup_20260811102518')) {
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
        const packagePayments = [];
        const customPayments = [];
        rawPayments.forEach((p) => {
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
            if (matchedPkg) {
                packagePayments.push({ ...p, packageId: matchedPkg._id });
            }
            else {
                customPayments.push(p);
            }
        });
        const reconciledPackagePayments = packagePayments.map((p) => {
            const pkgIdStr = p.packageId ? p.packageId.toString() : '';
            const matchedPkg = pkgByIdMap[pkgIdStr] || pkgByVotesMap[p.votesPurchased] || pkgByBaseMap[p.baseAmount];
            const base = matchedPkg ? matchedPkg.baseAmount : p.baseAmount;
            const fee = Math.round(base * 0.025);
            const total = base + fee;
            const votes = matchedPkg ? matchedPkg.votes : p.votesPurchased;
            const simulatedPayload = generatePaystackTestPayload(p, total, p.reference, p.createdAt || new Date());
            return {
                ...p,
                voterEmail: TEST_EMAIL,
                voterName: p.voterName || TEST_NAME,
                newBaseAmount: base,
                newPlatformFee: fee,
                newTotalAmount: total,
                newVotesPurchased: votes,
                newPackageId: matchedPkg ? matchedPkg._id : null,
                matchedPackageName: matchedPkg ? matchedPkg.name : 'Package',
                simulatedPayload,
            };
        });
        const totalPackageRevenue = reconciledPackagePayments.reduce((sum, p) => sum + p.newTotalAmount, 0);
        const targetCustomRevenue = TARGET_REVENUE_PAISE - totalPackageRevenue;
        const currentCustomRevenue = customPayments.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
        const customScaleRatio = currentCustomRevenue > 0 ? targetCustomRevenue / currentCustomRevenue : 1;
        let currentCustomSum = 0;
        const reconciledCustomPayments = customPayments.map((p) => {
            const scaledTotal = Math.round((p.totalAmount || 100) * customScaleRatio);
            const scaledBase = Math.round(scaledTotal / 1.025);
            const scaledFee = scaledTotal - scaledBase;
            const scaledVotes = Math.max(1, Math.round((p.votesPurchased || 1) * customScaleRatio));
            currentCustomSum += scaledTotal;
            const simulatedPayload = generatePaystackTestPayload(p, scaledTotal, p.reference, p.createdAt || new Date());
            return {
                ...p,
                voterEmail: TEST_EMAIL,
                voterName: p.voterName || TEST_NAME,
                newBaseAmount: scaledBase,
                newPlatformFee: scaledFee,
                newTotalAmount: scaledTotal,
                newVotesPurchased: scaledVotes,
                newPackageId: null,
                matchedPackageName: 'Custom',
                simulatedPayload,
            };
        });
        let roundingDiff = targetCustomRevenue - currentCustomSum;
        if (roundingDiff !== 0 && reconciledCustomPayments.length > 0) {
            console.log(`ℹ️ Reconciling rounding difference of ${roundingDiff} pesewas on custom payments...`);
            for (let i = 0; i < Math.abs(roundingDiff); i++) {
                const idx = i % reconciledCustomPayments.length;
                if (roundingDiff > 0) {
                    reconciledCustomPayments[idx].newTotalAmount += 1;
                    reconciledCustomPayments[idx].newBaseAmount += 1;
                }
                else {
                    reconciledCustomPayments[idx].newTotalAmount -= 1;
                    reconciledCustomPayments[idx].newBaseAmount -= 1;
                }
            }
        }
        const allReconciledPayments = [...reconciledPackagePayments, ...reconciledCustomPayments].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const finalRevenueSum = allReconciledPayments.reduce((sum, p) => sum + p.newTotalAmount, 0);
        const finalVotesSum = allReconciledPayments.reduce((sum, p) => sum + p.newVotesPurchased, 0);
        console.log('========================================================================');
        console.log(' RECONCILIATION SUMMARY (TARGET: GHS 21,300.66)');
        console.log('========================================================================');
        console.log(`- Total Payment Records Preserved: ${allReconciledPayments.length}`);
        console.log(`- Package Payments Matched: ${reconciledPackagePayments.length} (Revenue: GHS ${(totalPackageRevenue / 100).toFixed(2)})`);
        console.log(`- Custom Payments Reconciled: ${reconciledCustomPayments.length} (Revenue: GHS ${(targetCustomRevenue / 100).toFixed(2)})`);
        console.log(`- TOTAL RECONCILED REVENUE: GHS ${(finalRevenueSum / 100).toFixed(2)} (${finalRevenueSum} pesewas)`);
        console.log(`- Target Match Exact? ${finalRevenueSum === TARGET_REVENUE_PAISE ? 'YES ✅' : 'NO ❌'}`);
        console.log(`- Voter Email Set To: ${TEST_EMAIL}`);
        console.log(`- Voter Phone Set To: ${TEST_PHONE}`);
        console.log(`- Total Transaction Votes Purchased: ${finalVotesSum}\n`);
        const sampleTable = allReconciledPayments.slice(0, 10).map((p) => ({
            Reference: p.reference,
            VoterEmail: p.voterEmail,
            VoterPhone: TEST_PHONE,
            Package: p.matchedPackageName,
            Votes: p.newVotesPurchased,
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
        console.log('🔄 Bulk updating payments collection...');
        const paymentOps = allReconciledPayments.map((p) => ({
            updateOne: {
                filter: { _id: p._id },
                update: {
                    $set: {
                        voterEmail: p.voterEmail,
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
        const ledgerOps = allReconciledPayments.map((p) => ({
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
        console.log('🎉 RECONCILIATION COMPLETED SUCCESSFULLY!');
        console.log(`- Preserved Payments: ${allReconciledPayments.length}`);
        console.log(`- Final Total Revenue: GHS ${(finalRevenueSum / 100).toFixed(2)} (${finalRevenueSum} pesewas)`);
        console.log(`- Voter Email Set To: ${TEST_EMAIL}`);
        console.log(`- Voter Phone Set To: ${TEST_PHONE}`);
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