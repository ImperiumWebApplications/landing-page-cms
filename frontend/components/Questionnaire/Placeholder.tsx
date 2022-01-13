import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { PatchQuestion } from '@styled-icons/bootstrap';

import type { LandingPage } from '../../backend-api';
import { Section } from '../Section';
import { Layout } from '../Layout';

const StyledPlaceholder = styled(Section)`
  margin: 4rem auto;
  text-align: center;

  h1 {
    margin: 2rem 0;
    font-size: 1.5rem;
  }

  button {
    border: none;
    padding: 0.75rem 1rem;
    color: white;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};

    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }
  }
`;

export const PagePlaceholder: React.FunctionComponent<{
  domainContent: LandingPage;
}> = ({ domainContent }) => {
  return (
    <Layout content={domainContent}>
      <Placeholder />
    </Layout>
  );
};

export const Placeholder = () => {
  const router = useRouter();

  return (
    <StyledPlaceholder id="placeholder">
      <PatchQuestion width={200} height={200} opacity={0.25} />
      <h1>Leider konnte der aufgerufene Inhalt nicht geladen werden...</h1>
      <button type="button" onClick={() => router.back()}>
        Zurück zur letzten Seite
      </button>
    </StyledPlaceholder>
  );
};
