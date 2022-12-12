import type { CommonFieldProps } from '../Field';

export type CheckboxFieldProps = CommonFieldProps & {
  type: 'checkbox';
  value: boolean | undefined;
  onChange: () => void;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
  return (
    <div className="group flex items-center gap-3">
      <input
        type="checkbox"
        className={`h-6 w-6 cursor-pointer appearance-none border-2 rounded-md group-hover:border-secondary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary ${
          props.value ? 'bg-secondary border-secondary' : 'border-tertiary'
        }`}
        id={props.id}
        name={props.id}
        checked={!!props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="-mb-1 cursor-pointer wrap-words">
        {props.label}
      </label>
    </div>
  );
};
