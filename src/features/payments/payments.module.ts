import { Module } from '@nestjs/common';
import {
  HubtelService,
  PaystackService,
  PaymentVerificationService,
} from './payment-verification.service';

@Module({
  providers: [PaystackService, HubtelService, PaymentVerificationService],
  exports: [PaymentVerificationService],
})
export class PaymentsModule {}
