import type { NextPage } from 'next';
import { DomainSpecificContent, requestDomainSpecificContent } from '../interface/request';

const Home: NextPage<DomainSpecificContent> = () => {
  return <h1>ello</h1>;
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
