import type { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';

import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { Article } from '../components/Article';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';

const Imprint: NextPage<DomainSpecificContent> = ({
  domainContent,
  staticContent: { imprint: imprintTemplate },
}) => {
  return (
    <Layout content={domainContent}>
      <Section id="imprint">
        <Article>
          <ReactMarkdown>
            {populateMarkdownTemplate(imprintTemplate, domainContent) ?? ''}
          </ReactMarkdown>
        </Article>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Imprint;
