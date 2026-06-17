import type { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from "../../common/constants";
import { PaymentVerifier, ProviderVerificationResult } from './payment-verifier.interface';
export declare class PaystackService implements PaymentVerifier {
    private readonly configService;
    constructor(configService: ConfigService);
    supports(provider: PaymentProvider): provider is PaymentProvider.PAYSTACK | PaymentProvider.USSD;
    verify(reference: string): Promise<ProviderVerificationResult>;
}
export declare class HubtelService implements PaymentVerifier {
    private readonly configService;
    constructor(configService: ConfigService);
    supports(provider: PaymentProvider): provider is PaymentProvider.HUBTEL;
    verify(reference: string): Promise<ProviderVerificationResult>;
}
export declare class PaymentVerificationService {
    private readonly verifiers;
    private readonly logger;
    constructor(verifiers: PaymentVerifier[], logger: LoggerService);
    verify(provider: PaymentProvider, reference: string): Promise<ProviderVerificationResult>;
}
