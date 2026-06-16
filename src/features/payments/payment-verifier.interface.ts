import { PaymentProvider } from '@/common/constants';

export interface ProviderVerificationResult {
  success: boolean;
  amount: number;
  currency: string;
  raw: Record<string, unknown>;
}

export interface PaymentVerifier {
  supports(provider: PaymentProvider): boolean;
  verify(reference: string): Promise<ProviderVerificationResult>;
}

export const PAYMENT_VERIFIERS = Symbol('PAYMENT_VERIFIERS');

