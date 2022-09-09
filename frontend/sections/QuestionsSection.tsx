import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled, { useTheme } from 'styled-components';
import hexRgb from 'hex-rgb';

import { QuestionsSection as IQuestionsSection } from '../backend-api';
import { Section } from '../components/Section';
import { devices } from '../config/breakpoints.config';

const StyledQuestionsSection = styled(Section)`
  & > .content-wrapper {
    position: relative;
    min-height: 40vh;
    padding-top: 4rem;
    padding-bottom: 4rem;

    @media screen and (${devices.xl}) {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 10%;
        height: 100%;
        width: 0.25rem;
        border-right: 0.25rem dashed ${({ theme }) => theme.colors.primary};
        opacity: 0.25;
      }
    }
  }

  .title {
    margin-bottom: 2rem;
    font-size: 2.25rem;
    color: ${({ theme }) => theme.colors.secondary};

    @media screen and (${devices.md}) {
      margin-bottom: 3rem;
    }
  }

  .faq {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    row-gap: 2rem;

    @media screen and (${devices.md}) {
      flex-direction: row;
      column-gap: 3rem;
      row-gap: unset;
    }

    .questions {
      display: flex;
      width: 100%;
      margin: 0 -1rem;
      padding-right: 1rem;
      padding-left: 1rem;
      margin: 0 -1rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;

      @media screen and (${devices.md}) {
        display: block;
        max-width: 25rem;
        margin: 0;
        padding: 0;
      }

      @media screen and (${devices.lg}) {
        flex-shrink: 0;
      }

      &::-webkit-scrollbar {
        display: none;

        @media screen and (${devices.md}) {
          display: unset;
        }
      }

      .question {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        white-space: pre-wrap;
        max-width: 18rem;
        margin-right: 1rem;
        padding: 0.5rem 0.75rem;
        line-height: 1.5rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        background-color: ${({ theme }) =>
          hexRgb(theme.colors.text, { format: 'css', alpha: 0.1 })};

        @media screen and (${devices.md}) {
          max-width: unset;
          border-radius: unset;
          background-color: unset;
          flex-shrink: unset;
          justify-content: unset;
          align-items: unset;
          display: block;
          padding: 0;
          margin: 0 2rem 1.5rem 0;
        }

        &:last-of-type {
          margin-right: 0;
        }

        &:not(.active):hover {
          filter: brightness(120%);
        }

        &.active {
          background-color: ${({ theme }) =>
            hexRgb(theme.colors.text, { format: 'css', alpha: 1 })};
          color: white;

          @media screen and (${devices.md}) {
            background-color: unset;
            color: inherit;
            font-weight: 700;
          }
        }
      }
    }

    .answer {
      max-width: 40rem;
      line-height: 1.5rem;
    }
  }
`;

export const QuestionsSection: React.FunctionComponent<{
  id: string;
  content: IQuestionsSection;
}> = ({ id, content }) => {
  const [selectedQuestion, setSelectedQuestion] = React.useState(0);
  const theme = useTheme();

  if (!content.faq_item?.length) return <></>;

  const bgColor = hexRgb(theme.colors.primary, { format: 'css', alpha: 0.1 });

  const displayedAnswer = content.faq_item[selectedQuestion].answer;

  return (
    <StyledQuestionsSection id={id} bgColor={bgColor}>
      <h2 className="title">Antworten auf wichtige Fragen</h2>
      <div className="faq">
        <div className="questions">
          {content.faq_item.map(({ question }, i) => {
            return (
              <div
                key={i}
                onClick={() => setSelectedQuestion(i)}
                className={
                  i === selectedQuestion ? 'question active' : 'question'
                }
              >
                {question}
              </div>
            );
          })}
        </div>
        <div className="answer">
          {displayedAnswer ? (
            <ReactMarkdown>{displayedAnswer}</ReactMarkdown>
          ) : (
            <></>
          )}
        </div>
      </div>
    </StyledQuestionsSection>
  );
};
