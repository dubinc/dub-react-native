export type { DubOptions } from './types';
export { DubProvider, useDub } from './context';
import { init, trackOpen, trackLead, trackSale, clickId } from './init';
export type { Dub } from './dub';
export { init, trackOpen, trackLead, trackSale, clickId };

export default { init, trackOpen, trackLead, trackSale, clickId };
