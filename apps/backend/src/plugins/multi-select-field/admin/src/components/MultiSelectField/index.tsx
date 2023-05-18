import React, { useMemo } from 'react';
import { Select, Option } from '@strapi/design-system';
import { useIntl } from 'react-intl';

type MultiSelectFieldProps = {
  value: string;
  onChange: (event: any) => void;
  name: string;
  intlLabel: {
    id: string;
    defaultMessage: string;
  };
  required: boolean;
  attribute: {
    type: string;
    options: string[];
  };
  description: {
    id: string;
    defaultMessage: string;
  };
  placeholder: {
    id: string;
    defaultMessage: string;
  };
  disabled: boolean;
  error: string;
};

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  value,
  onChange,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}) => {
  const { formatMessage } = useIntl();

  const possibleOptions = useMemo(() => {
    return (attribute['options'] || [])
      .map((option) => {
        const [label, value] = [...option.split(':'), option];
        if (!label || !value) return null;
        return { label, value };
      })
      .filter(Boolean) as { label: string; value: string }[];
  }, [attribute]);

  const sanitizedValue = useMemo(() => {
    let parsedValue;
    try {
      parsedValue = JSON.parse(value || '[]');
    } catch (e) {
      parsedValue = [];
    }
    return Array.isArray(parsedValue)
      ? parsedValue.filter((val) =>
          possibleOptions.some((option) => option?.value === val),
        )
      : [];
  }, [value, possibleOptions]);

  return (
    <Select
      name={name}
      id={name}
      label={formatMessage(intlLabel)}
      error={
        error || (required && !possibleOptions.length ? 'No options' : null)
      }
      disabled={disabled || possibleOptions.length === 0}
      required={required}
      hint={description && formatMessage(description)}
      onChange={(v: MultiSelectFieldProps['attribute']['options']) => {
        onChange({
          target: {
            name: name,
            value: JSON.stringify(v.filter(Boolean)),
            type: attribute.type,
          },
        });
      }}
      placeholder={placeholder}
      multi
      value={sanitizedValue}
      withTags
    >
      {possibleOptions.map(({ label, value }) => (
        <Option value={value} key={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default MultiSelectField;
