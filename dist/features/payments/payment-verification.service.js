"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentVerificationService = exports.HubtelService = exports.PaystackService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../common/constants");
const payment_verifier_interface_1 = require("./payment-verifier.interface");
const nest_winston_1 = require("nest-winston");
let PaystackService = class PaystackService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    supports(provider) {
        return provider === constants_1.PaymentProvider.PAYSTACK || provider === constants_1.PaymentProvider.USSD;
    }
    async verify(reference) {
        const secretKey = this.configService.get('payments.paystackSecretKey');
        if (!secretKey) {
            throw new Error('Paystack secret key not configured');
        }
        const { data } = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization: `Bearer ${secretKey}` } });
        const transaction = data.data;
        return {
            success: transaction.status === 'success',
            amount: transaction.amount,
            currency: transaction.currency,
            raw: transaction,
        };
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaystackService);
let HubtelService = class HubtelService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    supports(provider) {
        return provider === constants_1.PaymentProvider.HUBTEL;
    }
    async verify(reference) {
        const clientId = this.configService.get('payments.hubtelClientId');
        const clientSecret = this.configService.get('payments.hubtelClientSecret');
        if (!clientId || !clientSecret) {
            throw new Error('Hubtel credentials not configured');
        }
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const { data } = await axios_1.default.get(`https://api.hubtel.com/v2/pos/onlinecheckout/${reference}`, { headers: { Authorization: `Basic ${auth}` } });
        return {
            success: data.status === 'Success',
            amount: Math.round(Number(data.amount) * 100),
            currency: 'GHS',
            raw: data,
        };
    }
};
exports.HubtelService = HubtelService;
exports.HubtelService = HubtelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HubtelService);
let PaymentVerificationService = class PaymentVerificationService {
    verifiers;
    logger;
    constructor(verifiers, logger) {
        this.verifiers = verifiers;
        this.logger = logger;
    }
    verify(provider, reference) {
        const verifier = this.verifiers.find((v) => v.supports(provider));
        if (!verifier) {
            this.logger.error(`No payment verifier registered for provider: ${provider}`);
            throw new Error(`Unsupported provider: ${provider}`);
        }
        return verifier.verify(reference);
    }
};
exports.PaymentVerificationService = PaymentVerificationService;
exports.PaymentVerificationService = PaymentVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(payment_verifier_interface_1.PAYMENT_VERIFIERS)),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [Array, Object])
], PaymentVerificationService);
//# sourceMappingURL=payment-verification.service.js.map