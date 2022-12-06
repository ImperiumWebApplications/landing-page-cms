import { ComponentProps } from 'react';
import cx from 'classnames';

export const Label = ({ className, ...props }: ComponentProps<'label'>) => {
  return (
    <label
      {...props}
      className={cx(
        className,
        'block mb-1 tracking-wide text-[0.9rem] md:text-base md:mb-3',
      )}
    />
  );
};
