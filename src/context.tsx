import type { Dub } from './dub';
import { init, dub } from './init';
import { createContext, useEffect, type ReactNode } from 'react';

type ContextProps = {};

const DubContext = createContext<ContextProps>({});

type Props = {
  publishableKey: string;
  domain: string;
  children: ReactNode;
};

export function DubProvider({ publishableKey, domain, children }: Props) {
  useEffect(() => {
    init({ publishableKey, domain });
  }, [publishableKey, domain]);

  return <DubContext.Provider value={{}}>{children}</DubContext.Provider>;
}

export const useDub = (): Dub => dub();
