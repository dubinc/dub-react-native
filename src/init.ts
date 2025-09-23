import type { DubOptions } from './types';
import { Dub } from './dub';
import type { TrackSaleRequestBody } from './api/models/track-sale';
import type { TrackLeadRequestBody } from './api/models/track-lead';

let _dub: Dub | undefined;

export const dub: () => Dub = () => {
  if (!_dub) {
    throw new Error('Dub not initialized');
  }

  return _dub;
};

export function init(options: DubOptions) {
  _dub = new Dub(options);
}

export const clickId = () => dub().clickId;

export const trackOpen = (deepLink?: string) => dub().trackOpen(deepLink);

export const trackLead = (body: Omit<TrackLeadRequestBody, 'clickId'>) =>
  dub().trackLead(body);

export const trackSale = (body: Omit<TrackSaleRequestBody, 'clickId'>) =>
  dub().trackSale(body);
