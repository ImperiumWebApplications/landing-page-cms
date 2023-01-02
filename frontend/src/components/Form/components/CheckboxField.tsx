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
        className={`h-6 w-6 flex-shrink-0 cursor-pointer appearance-none rounded-md border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 group-hover:border-secondary ${
          props.value ? 'border-secondary bg-secondary' : 'border-tertiary'
        }`}
        id={props.id}
        name={props.id}
        checked={!!props.value}
        onChange={props.onChange}
      />
      <label
        htmlFor={props.id}
        className="wrap-words -mb-1 cursor-pointer leading-normal"
      >
        {props.label}
      </label>
    </div>
  );
};
