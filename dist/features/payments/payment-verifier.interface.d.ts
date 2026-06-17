import { PaymentProvider } from "../../common/constants";
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
export declare const PAYMENT_VERIFIERS: unique symbol;
