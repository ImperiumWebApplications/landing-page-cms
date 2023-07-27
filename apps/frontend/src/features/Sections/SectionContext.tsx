import { createContext, ReactNode, useContext } from 'react';

import type { LandingPage } from '../../lib/strapi';

export type SectionState = {
  isNewDesign?: boolean;
};

const SectionStateContext = createContext<SectionState | null>(null);

type SectionContextProviderProps = {
  children?: ReactNode;
  initialState: SectionState;
};

export const SectionContextProvider = ({
  children,
  initialState,
}: SectionContextProviderProps) => {
  return (
    <SectionStateContext.Provider
      value={{
        isNewDesign: initialState.isNewDesign,
      }}
    >
      {children}
    </SectionStateContext.Provider>
  );
};

/**
 * Hooks / Helper
 */

export const useSectionContext = () => {
  const state = useContext(SectionStateContext);

  if (state == null) {
    throw new Error(
      'useSectionContext must be used within a SectionContextProvider',
    );
  }

  return { state };
};
