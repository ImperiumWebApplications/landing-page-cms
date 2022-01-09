import type { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import { NextSeo } from 'next-seo';
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

const Imprint: NextPage<DomainSpecificContent> = ({
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

export const getServerSideProps = requestDomainSpecificContent;

export default Imprint;
