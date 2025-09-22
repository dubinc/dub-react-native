import type { Customer } from './customer';
import type { Metadata } from './metadata';
import type { Sale } from './sale';

export interface TrackSaleRequestBody {
  customerExternalId: string;
  amount: number;
  currency?: string;
  eventName?: string;
  paymentProcessor?: PaymentProcessor;
  invoiceId?: string;
  metadata?: Metadata;
  leadEventName?: string;
  clickId?: string;
  customerName?: string;
  customerEmail?: string;
  customerAvatar?: string;
}

export type PaymentProcessor =
  | 'stripe'
  | 'shopify'
  | 'polar'
  | 'paddle'
  | 'revenuecat'
  | 'custom';

export interface TrackSaleResponse {
  eventName: string;
  customer?: Customer;
  sale?: Sale;
}
