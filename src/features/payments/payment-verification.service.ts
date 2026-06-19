import { Inject, Injectable } from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PaymentProvider } from '@/common/constants';
import {
  PAYMENT_VERIFIERS,
  PaymentVerifier,
  ProviderVerificationResult,
} from './payment-verifier.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

interface PaystackTransactionData {
  status: string;
  amount: number;
  currency: string;
}

interface PaystackVerifyResponse {
  data: PaystackTransactionData & Record<string, unknown>;
}

type HubtelVerifyResponse = {
  status: string;
  amount: number | string;
} & Record<string, unknown>;

@Injectable()
export class PaystackService implements PaymentVerifier {
  constructor(private readonly configService: ConfigService) {}

  supports(provider: PaymentProvider) {
    return (
      provider === PaymentProvider.PAYSTACK || provider === PaymentProvider.USSD
    );
  }

  async verify(reference: string): Promise<ProviderVerificationResult> {
    const secretKey = this.configService.get<string>(
      'payments.paystackSecretKey',
    );
    if (!secretKey) {
      throw new Error('Paystack secret key not configured');
    }

    const { data } = await axios.get<PaystackVerifyResponse>(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${secretKey}` } },
    );

    const transaction = data.data;

    return {
      success: transaction.status === 'success',
      amount: transaction.amount,
      currency: transaction.currency,
      raw: transaction,
    };
  }
}

@Injectable()
export class HubtelService implements PaymentVerifier {
  constructor(private readonly configService: ConfigService) {}

  supports(provider: PaymentProvider) {
    return provider === PaymentProvider.HUBTEL;
  }

  async verify(reference: string): Promise<ProviderVerificationResult> {
    const clientId = this.configService.get<string>('payments.hubtelClientId');
    const clientSecret = this.configService.get<string>(
      'payments.hubtelClientSecret',
    );

    if (!clientId || !clientSecret) {
      throw new Error('Hubtel credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const { data } = await axios.get<HubtelVerifyResponse>(
      `https://api.hubtel.com/v2/pos/onlinecheckout/${reference}`,
      { headers: { Authorization: `Basic ${auth}` } },
    );

    return {
      success: data.status === 'Success',
      amount: Math.round(Number(data.amount) * 100),
      currency: 'GHS',
      raw: data,
    };
  }
}

@Injectable()
export class PaymentVerificationService {
  constructor(
    @Inject(PAYMENT_VERIFIERS) private readonly verifiers: PaymentVerifier[],
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  verify(provider: PaymentProvider, reference: string) {
    const verifier = this.verifiers.find((v) => v.supports(provider));
    if (!verifier) {
      this.logger.error(
        `No payment verifier registered for provider: ${provider as string}`,
      );
      throw new Error(`Unsupported provider: ${provider as string}`);
    }
    return verifier.verify(reference);
  }
}
