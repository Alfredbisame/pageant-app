"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const payment_verification_service_1 = require("./payment-verification.service");
const payment_verifier_interface_1 = require("./payment-verifier.interface");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            payment_verification_service_1.PaystackService,
            payment_verification_service_1.HubtelService,
            {
                provide: payment_verifier_interface_1.PAYMENT_VERIFIERS,
                useFactory: (paystack, hubtel) => [
                    paystack,
                    hubtel,
                ],
                inject: [payment_verification_service_1.PaystackService, payment_verification_service_1.HubtelService],
            },
            payment_verification_service_1.PaymentVerificationService,
        ],
        exports: [payment_verification_service_1.PaymentVerificationService],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map