import React, { useState } from 'react';
import { Switch } from '@strapi/design-system';
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
      <label htmlFor="switch" className="sc-dkPtRN sc-bkkeKt GUInE cNnlrr">
        {label}
      </label>
      <Switch selected={activated} onChange={handleChange} visibleLabels />
    </>
  );
};

export default ConstructionSwitchComponent;
