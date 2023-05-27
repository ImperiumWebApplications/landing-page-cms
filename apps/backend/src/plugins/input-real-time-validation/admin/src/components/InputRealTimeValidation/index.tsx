import React, { useState, useEffect } from 'react';
import { TextInput } from '@strapi/design-system';

import { ProgressBar } from '../ProgressBar';

type RealTimeValidationInputPluginProps = {
  value: string;
  onChange: (event: any) => void;
  intlLabel: {
    id: string;
    defaultMessage: string;
  };
  name: string;
  attribute: {
    options: {
      maxLength: number;
      displayName: string;
    };
  };
  error: string;
};

const RealTimeValidationInputPlugin: React.FC<
  RealTimeValidationInputPluginProps
> = ({ onChange, value, name, attribute }) => {
  const [error, setError] = useState('');

  const handleOnChange = (e: any) => {
    const inputValue = e.target.value;
    onChange({ target: { name: name, value: inputValue } });
  };

  useEffect(() => {
    if (value?.length > attribute.options.maxLength) {
      setError(
        `Input value exceeds ${attribute.options.maxLength} characters!`,
      );
    } else {
      setError('');
    }
  }, [value]);

  const progress = (value?.length / attribute.options.maxLength) * 100;

  return (
    <>
      <TextInput
        type="text"
        label={attribute.options.displayName ?? name}
        value={value}
        onChange={handleOnChange}
        error={error.length > 0 && error}
      />
      {!!!error && (
        <ProgressBar
          value={progress}
          backgroundColor="neutral100"
          progressBackgroundColor="neutral500"
        />
      )}
    </>
  );
};

export default RealTimeValidationInputPlugin;
