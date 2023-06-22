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

const AgbPage: ContentPage = ({ content, staticContent, agbContent }) => {
  const pageContent = populateMarkdownTemplate(agbContent, content);

  return (
    <Layout content={content} staticContent={staticContent}>
      <NextSeo noindex={true} />
      <div id="agb" className="content-wrapper-xl">
        <Article>
          <ReactMarkdown>{pageContent ?? ''}</ReactMarkdown>
        </Article>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const currentDomain = context.req.headers.host;
  
  const fetchAgbContent = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/landing-pages`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_TOKEN}`, // Replace with your token
      },
    });
    const data = await response.json();
    const landingPage = data.data.find((page: any) => page.attributes.domain === currentDomain);
    return landingPage ? landingPage.attributes.agb : null;
  };

  const [contentPageProps, agbContent] = await Promise.all([
    queryContentPageContent(context),
    fetchAgbContent(),
  ]);

  if ('props' in contentPageProps) {
    return {
      props: {
        ...contentPageProps.props,
        agbContent,
      },
    };
  }
};

export default AgbPage;
