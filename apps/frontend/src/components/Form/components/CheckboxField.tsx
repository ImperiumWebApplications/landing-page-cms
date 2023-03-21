import type { CommonFieldProps } from '../Field';

export type CheckboxFieldProps = CommonFieldProps & {
  type: 'checkbox';
  value: boolean | undefined;
  onChange: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
  return (
    <div className="group flex items-center gap-3">
      <input
        {...props.inputProps}
        type="checkbox"
        className={`h-6 w-6 flex-shrink-0 cursor-pointer appearance-none rounded-md border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group-hover:border-primary ${
          props.value ? 'border-primary bg-primary' : 'border-[black]/10'
        }`}
        id={props.id}
        name={props.id}
        checked={!!props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="wrap-words cursor-pointer text-sm">
        {props.label}
      </label>
    </div>
  );
};
