import React, { useState } from 'react';
import { Switch, FieldLabel } from '@strapi/design-system';
import { useIntl } from 'react-intl';

const ConstructionSwitchComponent = ({
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
  const [activated, setActivated] = useState(value);
  const label = formatMessage({
    id: intlLabel.id,
    defaultMessage: intlLabel.defaultMessage,
  });

  const handleChange = (value: any) => {
    setActivated((s: any) => !s);
    onChange({
      target: { name, type: 'boolean', value: !activated },
    });
  };
  return (
    <>
      <FieldLabel style={{ padding: '0 0 0.5rem 0' }}>{label}</FieldLabel>
      <Switch selected={activated} onChange={handleChange} />
    </>
  );
};

export default ConstructionSwitchComponent;
