import { Module } from '@nestjs/common';
import {
  HubtelService,
  PaystackService,
  PaymentVerificationService,
} from './payment-verification.service';
import { PAYMENT_VERIFIERS } from './payment-verifier.interface';

@Module({
  providers: [
    PaystackService,
    HubtelService,
    {
      provide: PAYMENT_VERIFIERS,
      useFactory: (paystack: PaystackService, hubtel: HubtelService) => [
        paystack,
        hubtel,
      ],
      inject: [PaystackService, HubtelService],
    },
    PaymentVerificationService,
  ],
  exports: [PaymentVerificationService],
})
export class PaymentsModule {}
