import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';

const Home: NextPage<DomainSpecificContent> = ({ domainContent }) => {
  return (
    <Layout content={domainContent}>
      <h1>Hello</h1>
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
