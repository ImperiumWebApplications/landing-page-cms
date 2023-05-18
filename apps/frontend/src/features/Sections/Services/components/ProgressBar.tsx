import React, { useLayoutEffect, useState } from 'react';

const PROGRESS_BAR_CLASS = 'bar';

// Helper function to generate the CSS for each data point
const getCSSForDataPoints = () => {
  let css = ``;
  for (let i = 0; i <= 100; i++) {
    css += `.${PROGRESS_BAR_CLASS}[data-point='${i}'] {
                width: ${i}%;
            }
        `;
  }
  return css;
};

const INLINE_CSS = getCSSForDataPoints();

type ProgressBarProps = {
  label: string;
  value: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => {
  const [mounts, setMounts] = useState(false);

  useLayoutEffect(() => {
    if (!document.querySelector(`[data-progress-bar-style]`)) {
      setMounts(true);
    }
  }, []);

  return (
    <div className="relative mb-8 max-w-lg border-b-2 border-dashed border-tertiary">
      {mounts ? <style data-progress-bar-style>{INLINE_CSS}</style> : null}
      <span className="tracking-wider text-primary lg:text-xl">{label}</span>
      <span className="-mt-4 block pb-2 text-right font-semibold text-primary">
        {value}%
      </span>
      <div
        className={`${PROGRESS_BAR_CLASS} absolute -bottom-[2px] border-b-2 border-dashed border-secondary`}
        data-point={value}
      ></div>
    </div>
  );
};
