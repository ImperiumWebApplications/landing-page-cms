import type { NextPage } from 'next';
import styled from 'styled-components';

const Styled404 = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: +0.25px;
  line-height: 1.5rem;
  color: #aaa69d;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20% 0;
  h1 {
    font-size: 1.5rem;
  }
  a {
    background-color: #aaa69d;
    color: white;
    padding: 0.15rem 0.25rem;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 0.125rem;
  }
`;

const NotFound: NextPage = () => {
  return (
    <Styled404>
      <main>
        <h1>404 – Diese Seite existiert leider nicht.</h1>
        <p>
          <a href="/">Hier</a> kehrst du zur Startseite zurück.
        </p>
      </main>
    </Styled404>
  );
};

export default NotFound;
