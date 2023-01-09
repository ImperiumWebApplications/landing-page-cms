import React from 'react';

export const StepTitle: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h1 className="mb-8 text-center text-2xl md:mb-12 md:text-4xl">
      {children}
    </h1>
  );
};
