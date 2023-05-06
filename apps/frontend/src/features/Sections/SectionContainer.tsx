import type { ComponentProps } from 'react';

import cx from 'classnames';

type SectionContainerProps = ComponentProps<'div'> & {
  contentWrapperClassName?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

export const SectionContainer: React.FC<SectionContainerProps> = ({
  contentWrapperClassName,
  fullWidth,
  children,
  ...rest
}) => {
  return (
    <div {...rest}>
      {fullWidth ? (
        children
      ) : (
        <div className={cx('content-wrapper', contentWrapperClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};
