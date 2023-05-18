import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';

import type { LandingPage, LandingPageLanguage } from '../lib/strapi';
import { i18n } from '../config/i18n.config';
import { Country } from '../config/countries.config';
import { Article } from '../components/Article';
import { Layout } from '../components/Layout';
import { ContentPage, queryContentPageContent } from '../lib/next/app';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import { useLanguageContext } from '../context/Language';

const ImprintPage: ContentPage = ({ content, staticContent }) => {
  const { language } = useLanguageContext();

  const enrichedDomainContent = enrichDomainContent(content, language);
  const pageContent = populateMarkdownTemplate(
    staticContent.imprint,
    enrichedDomainContent,
  );

  return (
    <Layout content={enrichedDomainContent} staticContent={staticContent}>
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
  language?: LandingPageLanguage,
  vat?: string | null,
) => {
  if (!vat || !language) return undefined;

  switch (country) {
    case Country.Germany:
      return `${i18n[language].VAT_ID_GERMANY}:\n${vat}`;
    case Country.Switzerland:
      return `${i18n[language].VAT_ID_SWITZERLAND}:\n${vat}`;
    default:
      return `${i18n[language].VAT_ID_GENERIC}:\n${vat}`;
  }
};

const enrichDomainContent = (
  domainContent: LandingPage,
  language: LandingPageLanguage,
): LandingPage => {
  const country =
    domainContent.countries?.length === 1
      ? domainContent.countries[0]
      : undefined;

  const vat = domainContent.client_vat;

  return {
    ...domainContent,
    client_vat: getVatSpecification(country, language, vat),
  };
};
