import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import type { LandingPage, StaticContent } from '../lib/strapi';
import type { ArticleProps } from '../components/Article';
import { queryStaticPageContent } from '../lib/next/app';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import { Layout } from '../components/Layout';

const Article = dynamic<ArticleProps>(
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
        <Article>
          <ReactMarkdown>{pageContent ?? ''}</ReactMarkdown>
        </Article>
      </div>
    </Layout>
  );
};

export const getServerSideProps = queryStaticPageContent;

export default PrivacyPage;
