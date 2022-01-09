import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';

const ClientSideOnlyArticle = dynamic<{}>(
  () => import('../components/Article').then((mod) => mod.Article),
  { ssr: false },
);

const Privacy: NextPage<DomainSpecificContent> = ({
  domainContent,
  staticContent: { privacy: privacyTemplate },
}) => {
  return (
    <Layout content={domainContent}>
      <NextSeo noindex={true} />
      <Section id="privacy">
        <ClientSideOnlyArticle>
          <ReactMarkdown>
            {populateMarkdownTemplate(privacyTemplate, domainContent) ?? ''}
          </ReactMarkdown>
        </ClientSideOnlyArticle>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Privacy;
