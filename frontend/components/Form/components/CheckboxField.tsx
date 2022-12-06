import { CommonFieldProps } from '../Field';

export type CheckboxFieldProps = CommonFieldProps & {
  type: 'checkbox';
  options: { label: string; value: string }[];
};

export const CheckboxField = () => {
  return <div>TextField</div>;
};
