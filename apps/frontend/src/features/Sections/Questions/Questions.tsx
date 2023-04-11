import React from 'react';

import cx from 'classnames';
import ReactMarkdown from 'react-markdown';
import { Disclosure, Transition } from '@headlessui/react';

import type { StaticContent } from '../../../lib/strapi/model';
import { MinusIcon, PlusIcon } from '../../../components/Icons';

import { SectionContainer } from '../SectionContainer';
import { QuestionsSectionContent } from '../SectionMapper';
import { useSectionContext } from '../SectionContext';

import { Questions_OLD } from './Questions_OLD';

type QuestionsSectionProps = {
  id: string;
  content: QuestionsSectionContent;
  staticContent: StaticContent['questions_section'];
};

export const QuestionsSection: React.FC<QuestionsSectionProps> = (props) => {
  const { state } = useSectionContext();

  if (!state.isNewDesign) return <Questions_OLD {...props} />;

  const questions = props.content.faq_item;

  if (!questions?.length) return null;

  return (
    <SectionContainer id={props.id} className="mt-16 mb-12 md:my-[70px]">
      <h2
        data-testid="questions-headline"
        className="mb-2 text-center text-xl text-primary md:mb-12 md:text-4xl"
      >
        {props.staticContent?.title}
      </h2>
      <div className="mx-auto flex max-w-3xl flex-col">
        {questions.map(({ id, question, answer }) => {
          if (!question || !answer) return null;

          return (
            <Disclosure key={id}>
              {({ open }) => (
                <div className="border-b border-[#505050] border-opacity-25 py-5">
                  <Disclosure.Button
                    data-testid="questions-question"
                    className="flex w-full flex-row justify-between gap-8 font-bold"
                  >
                    <span
                      className={cx(
                        'text-left text-sm leading-5 md:text-base md:leading-7',
                        open ? 'text-primary' : '',
                      )}
                    >
                      {question}
                    </span>
                    <div
                      className={cx(
                        'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200',
                        open ? 'bg-primary' : 'bg-secondary',
                      )}
                      aria-hidden="true"
                    >
                      {open ? (
                        <MinusIcon className="w-3 stroke-[white]" />
                      ) : (
                        <PlusIcon className="w-4 stroke-[white]" />
                      )}
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel
                    unmount={false}
                    data-testid="questions-answer"
                  >
                    <Transition
                      className="overflow-hidden transition-all duration-200"
                      enterFrom="transform opacity-0"
                      enterTo="transform opacity-100"
                      leaveFrom="transform opacity-100"
                      leaveTo="transform opacity-0"
                    >
                      <ReactMarkdown className="article text-sm md:text-base">
                        {answer}
                      </ReactMarkdown>
                    </Transition>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    </SectionContainer>
  );
};
