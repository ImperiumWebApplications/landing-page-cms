import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import type { LandingPage } from '../backend-api';
import type { ContentPageContent } from '../interface/getServerSideProps';
import { collectContentPageContent } from '../interface/getServerSideProps';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import { Country, getCountryByDomain } from '../utils/getCountryByDomain';

const ClientSideOnlyArticle = dynamic<{ children: ReactElement }>(
  () => import('../components/Article').then((mod) => mod.Article),
  { ssr: false },
);

const getVatSpecification = (
  country: Country | undefined,
  vat: string | undefined,
) => {
  if (!vat) return undefined;

  switch (country) {
    case Country.Germany:
      return `Umsatzsteuer-Identifikationsnummer gem. § 27a UStG:\n${vat}`;
    case Country.Switzerland:
      return `Unternehmens-Identifikationsnummer (UID):\n${vat}`;
    default:
      return `Unternehmens-Identifikation:\n${vat}`;
  }
};

const enrichDomainContent = (domainContent: LandingPage): LandingPage => {
  const country = getCountryByDomain(domainContent.domain);

  return {
    ...domainContent,
    client_vat: getVatSpecification(country, domainContent.client_vat),
  };
};

const ImprintPage: NextPage<ContentPageContent> = ({
  domainContent,
  staticContent: { imprint: imprintTemplate },
}) => {
  const enrichedDomainContent = enrichDomainContent(domainContent);

  return (
    <Layout content={enrichedDomainContent}>
      <NextSeo noindex={true} />
      <Section id="imprint">
        <ClientSideOnlyArticle>
          <ReactMarkdown>
            {populateMarkdownTemplate(imprintTemplate, enrichedDomainContent) ??
              ''}
          </ReactMarkdown>
        </ClientSideOnlyArticle>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = collectContentPageContent;

export default ImprintPage;
