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
    <div className={cn('mx-auto max-w-[1080px]', className)}>{children}</div>
  );
};
