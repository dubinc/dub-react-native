import type { Metadata } from './metadata';

export interface Sale {
  amount: number;
  currency: string;
  paymentProcessor: string;
  invoiceId?: string;
  metadata?: Metadata;
}
