import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';

import type { LandingPage } from '../lib/strapi';
import { Article } from '../components/Article';
import { Layout } from '../components/Layout';
import { ContentPage, queryContentPageContent } from '../lib/next/app';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import { Country } from '../config/countries.config';

const ImprintPage: ContentPage = ({ content, staticContent }) => {
  const enrichedDomainContent = enrichDomainContent(content);
  const pageContent = populateMarkdownTemplate(
    staticContent.imprint,
    enrichedDomainContent,
  );

  return (
    <Layout content={enrichedDomainContent}>
      <NextSeo noindex={true} />
      <div id="imprint" className="content-wrapper-xl">
        <Article>
          <ReactMarkdown>{pageContent ?? ''}</ReactMarkdown>
        </Article>
      </div>
    </Layout>
  );
};

export const getServerSideProps = queryContentPageContent;

export default ImprintPage;

/** Helper */

const getVatSpecification = (
  country?: string,
  language?: string,
  vat?: string | null,
) => {
  if (!vat) return undefined;

  if (language === 'German') {
    switch (country) {
      case Country.Germany:
        return `Umsatzsteuer-Identifikationsnummer gem. § 27a UStG:\n${vat}`;
      case Country.Switzerland:
        return `Unternehmens-Identifikationsnummer (UID):\n${vat}`;
      default:
        return `Unternehmens-Identifikation:\n${vat}`;
    }
  }

  if (language === 'English') {
    switch (country) {
      case Country.Germany:
        return `Value Added Tax Identification Number(according to § 27a UStG):\n${vat}`;
      case Country.Switzerland:
        return `Company Identification Number (UID):\n${vat}`;
      default:
        return `Company Identification:\n${vat}`;
    }
  }

  return undefined;
};

const enrichDomainContent = (domainContent: LandingPage): LandingPage => {
  const country =
    domainContent.countries?.length === 1
      ? domainContent.countries[0]
      : undefined;

  const language = domainContent.language ?? 'German';
  const vat = domainContent.client_vat;

  return {
    ...domainContent,
    client_vat: getVatSpecification(country, language, vat),
  };
};
