import { GlobalStyle } from '../styles/globalStyles';

export const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <header>Hello</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
};
