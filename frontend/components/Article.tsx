import styled from 'styled-components';

const StyledArticle = styled.footer`
  padding-top: 3rem;
  padding-bottom: 5rem;

  // Handling long words and links
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;

  h2 {
    margin-top: 2rem;
  }
  h3 {
    margin-top: 1rem;
  }
`;

export const Article: React.FunctionComponent<{}> = ({ children }) => {
  return <StyledArticle>{children}</StyledArticle>;
};
