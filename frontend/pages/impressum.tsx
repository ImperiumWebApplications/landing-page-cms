import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import type { ContentPageContent } from '../interface/getServerSideProps';
import { collectContentPageContent } from '../interface/getServerSideProps';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';

const ClientSideOnlyArticle = dynamic<{ children: ReactElement }>(
  () => import('../components/Article').then((mod) => mod.Article),
  { ssr: false },
);

const ImprintPage: NextPage<ContentPageContent> = ({
  domainContent,
  staticContent: { imprint: imprintTemplate },
}) => {
  return (
    <Layout content={domainContent}>
      <NextSeo noindex={true} />
      <Section id="imprint">
        <ClientSideOnlyArticle>
          <ReactMarkdown>
            {populateMarkdownTemplate(imprintTemplate, domainContent) ?? ''}
          </ReactMarkdown>
        </ClientSideOnlyArticle>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = collectContentPageContent;

export default ImprintPage;
