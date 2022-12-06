import { CommonFieldProps } from '../Field';

export type RadioGroupFieldProps = CommonFieldProps & {
  type: 'radio';
  options: { label: string; value: string }[];
};

export const RadioGroupField = () => {
  return <div>TextField</div>;
};
