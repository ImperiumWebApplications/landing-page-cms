import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Typography, Loader } from '@strapi/design-system';

const REQUEST_ENDPOINT = `https://leadquelle.net/api/service-types`;

const TypographyMaxWidth = styled(Typography)`
  max-width: 300px;
`;

export const ServiceTypeCell = ({ id }) => {
  const [label, setLabel] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`${REQUEST_ENDPOINT}?questionnaire=${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        const json = await res.json();
        if (!json.success) throw new Error('Error while fetching service type');

        const serviceTypes = json.data.relatedServiceTypes;
        if (serviceTypes.length > 0) setLabel(serviceTypes.join(', '));

        setIsFetching(false);
      } catch (e) {
        setIsFetching(false);
        console.log('Error while fetching service type', e);
      }
    })();
  }, []);

  if (isFetching) return <Loader small>Loading...</Loader>;
  if (!label) return <Typography textColor="neutral800">-</Typography>;

  return (
    <TypographyMaxWidth ellipsis textColor="neutral800">
      {label}
    </TypographyMaxWidth>
  );
};
