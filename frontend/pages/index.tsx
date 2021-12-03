import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { defaultSEOProps } from '../config/seo.config';
import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';

const Home: NextPage<DomainSpecificContent> = ({ domainContent }) => {
  const seoProps = defaultSEOProps(domainContent);
  return (
    <>
      <NextSeo {...seoProps} />
      <h1>Hello</h1>
    </>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
