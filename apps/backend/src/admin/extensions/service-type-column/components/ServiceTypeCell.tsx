import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Typography } from '@strapi/design-system';

import { getAuthToken } from '../utils/getAuthToken';

const REQUEST_ENDPOINT = '/api/landing-pages?populate=questionnaires_relations';

const TypographyMaxWidth = styled(Typography)`
  max-width: 300px;
`;

export const ServiceTypeCell = ({ id }) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = getAuthToken();
        if (!token) throw new Error('No auth token found');
        const res = await fetch(
          `${REQUEST_ENDPOINT}&filters[questionnaires_relations][id][$eq]=${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${CUSTOM_VARIABLES.ADMIN_CLIENT_JWT_TOKEN}`,
            },
          },
        );

        const json = await res.json();

        const landingPagesWithServiceType = json.data.filter((landingPage) => {
          return landingPage.attributes.service_type;
        });

        if (landingPagesWithServiceType.length > 0) {
          const serviceTypes = landingPagesWithServiceType
            .map((landingPage) => landingPage.attributes.service_type)
            .join(', ');

          setLabel(serviceTypes);
        }
      } catch (e) {
        console.log('Error while fetching service type', e);
      }
    })();
  }, []);

  if (!label) return <Typography textColor="neutral800">-</Typography>;

  return (
    <TypographyMaxWidth ellipsis textColor="neutral800">
      {label}
    </TypographyMaxWidth>
  );
};
