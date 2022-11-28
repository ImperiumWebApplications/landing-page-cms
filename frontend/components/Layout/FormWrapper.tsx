import cn from 'classnames';

type ContentWrapperProps = {
  className?: string;
  children?:
    | React.ReactElement
    | (React.ReactElement | string | null | undefined)[];
};

export const FormWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('max-w-[1080px] mx-auto', className)}>{children}</div>
  );
};
