import { ComponentProps } from 'react';

type TextInputProps = ComponentProps<'input'> & {
  label?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  id,
  ...props
}) => {
  return (
    <div className="text-left" data-text-input>
      <label htmlFor={id} className="text-secondary font-semibold text-lg">
        {label}
      </label>
      <input
        {...props}
        id={id}
        value={value ?? ''}
        className="w-full border-[1px] border-secondary rounded-xl px-4 pt-3 pb-2"
      />
    </div>
  );
};
