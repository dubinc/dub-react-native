import type { Link } from './link';

export interface TrackOpenRequestBody {
  deepLink?: string;
  dubDomain?: string;
}

export interface TrackOpenResponse {
  clickId?: string;
  link?: Link;
}
