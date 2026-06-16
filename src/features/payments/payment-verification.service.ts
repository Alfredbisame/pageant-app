import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PaymentProvider } from '@/common/constants';

export interface ProviderVerificationResult {
  success: boolean;
  amount: number;
  currency: string;
  raw: Record<string, unknown>;
}

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
export class PaystackService {
  constructor(private readonly configService: ConfigService) {}

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
export class HubtelService {
  constructor(private readonly configService: ConfigService) {}

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
    private readonly paystackService: PaystackService,
    private readonly hubtelService: HubtelService,
  ) {}

  verify(provider: PaymentProvider, reference: string) {
    switch (provider) {
      case PaymentProvider.PAYSTACK:
        return this.paystackService.verify(reference);
      case PaymentProvider.HUBTEL:
        return this.hubtelService.verify(reference);
      case PaymentProvider.USSD:
        return this.paystackService.verify(reference);
      default:
        throw new Error(`Unsupported provider: ${provider as string}`);
    }
  }
}
