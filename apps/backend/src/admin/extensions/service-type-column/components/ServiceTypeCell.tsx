import React from 'react';

import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Typography, Loader } from '@strapi/design-system';
import { useFetchClient } from '@strapi/helper-plugin';

const TypographyMaxWidth = styled(Typography)`
  max-width: 300px;
`;

export const ServiceTypeCell = ({ id }) => {
  const client = useFetchClient();
  const { data, status } = useQuery(['landing-page', id], () =>
    fetchServiceTypes(client, id),
  );

  if (status === 'loading') return <Loader small>Loading...</Loader>;

  const serviceTypes = deriveServiceTypes(data);

  if (!serviceTypes || status === 'error' || status === 'idle')
    return <Typography textColor="neutral800">-</Typography>;

  return (
    <TypographyMaxWidth ellipsis textColor="neutral800">
      {serviceTypes}
    </TypographyMaxWidth>
  );
};

const fetchServiceTypes = async (client, id) => {
  const { data } = await client.get(
    `/content-manager/collection-types/api::landing-page.landing-page?populate[questionnaires_relations][fields]=*&filters[questionnaires_relations][id][$eq]=${id}`,
  );

  return data?.results;
};

const deriveServiceTypes = (data) => {
  if (!data) return undefined;

  const serviceTypes = data
    .filter((landingPage) => landingPage.service_type)
    .map((landingPage) => landingPage.service_type);

  if (!serviceTypes || serviceTypes.length === 0) return undefined;

  return serviceTypes.join(', ');
};
