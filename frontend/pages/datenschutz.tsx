import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import type { LandingPage, StaticContent } from '../lib/strapi';
import { queryStaticPageContent } from '../lib/next/app';
import { Layout } from '../components/Layout/Layout';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';

const ClientSideOnlyArticle = dynamic<{ children: ReactElement }>(
  () => import('../components/Article').then((mod) => mod.Article),
  { ssr: false },
);

const PrivacyPage: NextPage<{ content: LandingPage & StaticContent }> = ({
  content,
}) => {
  const pageContent = populateMarkdownTemplate(content.privacy, content);

  return (
    <Layout content={content}>
      <NextSeo noindex={true} />
      <div id="privacy" className="content-wrapper">
        <ClientSideOnlyArticle>
          <ReactMarkdown>{pageContent ?? ''}</ReactMarkdown>
        </ClientSideOnlyArticle>
      </div>
    </Layout>
  );
};

export const getServerSideProps = queryStaticPageContent;

export default PrivacyPage;
