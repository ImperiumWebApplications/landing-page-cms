import cx from 'classnames';

type SectionContainerProps = {
  id: string;
  className?: string;
  contentWrapperClassName?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className,
  contentWrapperClassName,
  fullWidth,
  style,
  children,
}) => {
  return (
    <div id={id} className={className} style={style}>
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
