import React, { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import cx from 'classnames';

import { SectionContainer } from '../SectionContainer';
import { QuestionsSectionContent } from '../SectionMapper';
import { useThemeColor } from '../../../hooks/useThemeColor';

type QuestionsSectionProps = {
  id: string;
  content: QuestionsSectionContent;
};

export const Questions_OLD: React.FC<QuestionsSectionProps> = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const primaryHex = useThemeColor('primary');

  if (!props.content.faq_item?.length) return null;

  const displayedAnswer = props.content.faq_item[selectedQuestion].answer;

  return (
    <SectionContainer
      id={props.id}
      className="mt-12"
      style={{ backgroundColor: `${primaryHex}1A` }}
    >
      <div className='relative min-h-[40vh] py-12 lg:py-24 xl:after:absolute xl:after:top-0 xl:after:right-[5%] xl:after:h-full xl:after:w-1 xl:after:border-r-4 xl:after:border-dashed xl:after:border-primary xl:after:opacity-25 xl:after:content-[""]'>
        <h2 className="mb-8 text-4xl text-secondary lg:mb-12">
          Antworten auf wichtige Fragen
        </h2>
        <div className="flex flex-col items-start justify-start gap-y-8 lg:flex-row lg:gap-x-12 lg:gap-y-0">
          <div
            data-testid="questions-tab-header"
            className="scrollbar-hide my-0 flex w-full overflow-x-auto whitespace-nowrap lg:m-0 lg:block lg:max-w-md lg:flex-shrink-0 lg:p-0"
          >
            {props.content.faq_item.map(({ question }, i, arr) => {
              const selected = i === selectedQuestion;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedQuestion(i)}
                  className={cx(
                    'mr-4 flex max-w-[18rem] flex-shrink-0 cursor-pointer items-center justify-center whitespace-pre-wrap rounded-md py-2 px-3 lg:mt-0 lg:mb-6 lg:mr-6 lg:ml-0 lg:block lg:max-w-none lg:flex-shrink lg:items-start lg:justify-start lg:rounded-none lg:bg-[transparent] lg:p-0',
                    selected
                      ? 'bg-gray bg-opacity-10 text-[white] lg:bg-[transparent] lg:font-semibold lg:text-gray'
                      : 'border-2 border-dashed border-gray hover:brightness-125 lg:border-[transparent]',
                    i === arr.length - 1 ? 'mr-0' : '',
                  )}
                >
                  {question}
                </div>
              );
            })}
          </div>
          <div data-testid="questions-tab-content" className="max-w-2xl">
            {displayedAnswer ? (
              <ReactMarkdown className="article">
                {displayedAnswer}
              </ReactMarkdown>
            ) : null}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
