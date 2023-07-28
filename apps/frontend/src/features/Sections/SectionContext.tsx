import { createContext, ReactNode, useContext } from 'react';

const SectionStateContext = createContext<any>(null);

type SectionContextProviderProps = {
  children?: ReactNode;
};

export const SectionContextProvider = ({
  children,
}: SectionContextProviderProps) => {
  return (
    <SectionStateContext.Provider value={null}>
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
