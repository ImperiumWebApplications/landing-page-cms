import type { NextPage } from 'next';
import type { AppContext } from 'next/app';
import { DomainSpecificContent, requestDomainSpecificContent } from '../interface/request';

const Home: NextPage<DomainSpecificContent> = ({ domainContent }) => {
  return <h1>ello</h1>;
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
