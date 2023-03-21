import React from 'react';

export const StepTitle: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h1 className="mb-5 text-center text-base md:mb-12 md:text-[22px]">
      {children}
    </h1>
  );
};
