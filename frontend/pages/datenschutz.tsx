import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';

const Privacy: NextPage<DomainSpecificContent> = ({ domainContent }) => {
  return (
    <Layout content={domainContent}>
      <h1>Datenschutz</h1>
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Privacy;
