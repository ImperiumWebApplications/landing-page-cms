import ReactMarkdown from 'react-markdown';

import { Button } from '../../../components/Button';
import { Animation } from '../../../components/Animation/Animation';
import { startQuestionnaire } from '../../../config/navigation.config';

import { SectionContainer } from '../SectionContainer';
import { CallToActionSectionContent } from '../SectionMapper';
import { ArrowRightCircleIcon } from '../../../components/Icons';

type CallToActionSectionProps = {
  id: string;
  content: CallToActionSectionContent;
};

export const CallToActionSection: React.FC<CallToActionSectionProps> = (
  props,
) => {
  return (
    <SectionContainer id={props.id} className="my-16 overflow-x-hidden">
      <Animation type="fadeIn">
        <div className="grid grid-flow-row grid-cols-[100%] gap-12 md:grid-cols-2 md:grid-rows-[100%]">
          <div className="mb-4 md:mb-0 md:border-r-4 md:border-dashed md:border-tertiary">
            <h2 className="mb-4">{props.content.title}</h2>
            <p className="max-w-[80%]">{props.content.subtitle}</p>
          </div>
          <div className="description">
            {props.content.service_description && (
              <ReactMarkdown>{props.content.service_description}</ReactMarkdown>
            )}
          </div>
        </div>
      </Animation>
      <Animation type="fadeRight" delay={200}>
        <div className="xl:after:contents-[''] relative mt-8 flex max-w-6xl flex-col items-start justify-between gap-8 rounded-md border-4 border-dashed border-tertiary bg-[#f8f8f8] px-6 py-12 md:mt-12 md:flex-row md:items-center md:justify-start md:gap-16 md:px-8 xl:before:absolute xl:before:top-[10px] xl:before:left-[105%] xl:before:h-[90%] xl:before:w-full xl:before:rounded-lg xl:before:bg-tertiary xl:before:opacity-50 xl:after:absolute xl:after:top-[10px] xl:after:right-[105%] xl:after:h-[90%] xl:after:w-full xl:after:rounded-lg xl:after:bg-tertiary xl:after:opacity-50">
          <div className="mb-8 mr-4 whitespace-nowrap text-4xl font-semibold tracking-tighter opacity-75 md:mb-0 md:text-5xl">
            Überzeugt ?
          </div>
          <div className="flex w-full flex-grow flex-col items-center justify-between gap-y-4 gap-x-12 lg:flex-row xl:w-auto">
            <Button
              variant="secondary"
              size="fullWidth"
              to={startQuestionnaire.href}
              label={startQuestionnaire.label}
              Icon={<ArrowRightCircleIcon className="h-5 w-5" />}
            />
            {props.content.phone && (
              <>
                <span>Oder</span>
                <Button
                  variant="primary"
                  size="fullWidth"
                  to={`tel:${props.content.phone}`}
                  label={props.content.phone}
                />
              </>
            )}
          </div>
        </div>
      </Animation>
    </SectionContainer>
  );
};
