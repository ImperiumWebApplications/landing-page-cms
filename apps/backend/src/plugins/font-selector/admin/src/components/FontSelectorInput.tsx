import React, { useState } from 'react';
import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useIntl } from 'react-intl';

const FontSelectorInput = ({
  value,
  onChange,
  name,
  intlLabel,
}: {
  value: any;
  onChange: any;
  name: any;
  intlLabel: any;
}) => {
  const { formatMessage } = useIntl();
  const [selectedFont, setSelectedFont] = useState(value);

  const handleChange = (font: any) => {
    setSelectedFont(font);
    onChange({
      target: { name, type: 'string', value: font },
    });
  };

  return (
    <SingleSelect
      label={formatMessage({
        id: intlLabel.id,
        defaultMessage: intlLabel.defaultMessage,
      })}
      placeholder="Select a font"
      value={selectedFont}
      onChange={handleChange}
    >
      <SingleSelectOption value="Arial">Arial</SingleSelectOption>
      <SingleSelectOption value="Times New Roman">
        Times New Roman
      </SingleSelectOption>
      <SingleSelectOption value="Courier New">Courier New</SingleSelectOption>
      <SingleSelectOption value="Cursive">Cursive</SingleSelectOption>
    </SingleSelect>
  );
};

export default FontSelectorInput;
