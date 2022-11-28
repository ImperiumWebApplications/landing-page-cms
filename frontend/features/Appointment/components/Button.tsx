import type { ComponentProps } from 'react';

import cn from 'classnames';

type CustomButtonProps = {
  variant?: 'text' | 'button';
  isLoading?: boolean;
};

export const Button = ({
  children,
  className,
  variant,
  disabled,
  isLoading,
  ...props
}: ComponentProps<'button'> & CustomButtonProps) => {
  variant = variant ?? 'text';

  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        'relative',
        variant === 'button'
          ? disabled
            ? 'text-[white] min-w-[140px] bg-[black] opacity-50 pt-3 pb-2 px-6 rounded-md'
            : 'text-[white] min-w-[140px] bg-primary pt-3 pb-2 px-8 rounded-md'
          : disabled
          ? 'bg-[black] min-w-[140px] text-[white] md:text-[black] opacity-50 pt-3 pb-2 px-8 rounded-md md:bg-[transparent] md:p-0 md:underline  md:opacity-50 md:font-semibold md:text-lg md:tracking-tight'
          : 'text-[white] min-w-[140px] md:text-secondary bg-primary pt-3 pb-2 px-8 rounded-md md:bg-[transparent] md:p-0 md:underline md:font-semibold md:text-lg md:tracking-tight',
        className,
      )}
    >
      <span className="spinner" style={{ opacity: isLoading ? 1 : 0 }} />
      <span style={{ opacity: isLoading ? 0 : 1 }}>{children}</span>
    </button>
  );
};
