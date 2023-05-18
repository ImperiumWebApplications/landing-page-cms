import cn from 'classnames';

type FormWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('mx-auto max-w-[1080px]', className)}>{children}</div>
  );
};
