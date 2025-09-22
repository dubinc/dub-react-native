import type { Click } from './click';
import type { Customer } from './customer';
import type { Link } from './link';
import type { Metadata } from './metadata';

export interface TrackLeadRequestBody {
  clickId: string;
  eventName: string;
  customerExternalId: string;
  customerName?: string;
  customerEmail?: string;
  customerAvatar?: string;
  mode?: TrackLeadMode;
  eventQuantity?: number;
  metadata?: Metadata;
}

export enum TrackLeadMode {
  Async = 'async',
  Wait = 'wait',
  Deferred = 'deferred',
}

export interface TrackLeadResponse {
  click: Click;
  link?: Link;
  customer: Customer;
}
