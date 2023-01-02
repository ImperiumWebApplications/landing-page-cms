import { ComponentProps } from 'react';
import cx from 'classnames';

export const Label = ({ className, ...props }: ComponentProps<'label'>) => {
  return (
    <label
      {...props}
      className={cx(
        className,
        'mb-1 block text-[0.9rem] tracking-wide md:mb-3 md:text-base',
      )}
    />
  );
};
