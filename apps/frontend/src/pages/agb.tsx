import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import type { ArticleProps } from '../components/Article';
import { ContentPage, queryContentPageContent } from '../lib/next/app';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import { Layout } from '../components/Layout';

const Article = dynamic<ArticleProps>(
  () => import('../components/Article').then((mod) => mod.Article),
  { ssr: false },
);

const AGBPage: ContentPage = ({ content, staticContent }) => {
  const pageContent = populateMarkdownTemplate(content.agb, content);

  return (
    <Layout content={content} staticContent={staticContent}>
      <NextSeo noindex={true} />
      <div id="privacy" className="content-wrapper-xl">
        <Article>
          <ReactMarkdown>{pageContent ?? ''}</ReactMarkdown>
        </Article>
      </div>
    </Layout>
  );
};

export const getServerSideProps = queryContentPageContent;

export default AGBPage;
