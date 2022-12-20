import { useMemo } from 'react';

import type { HeroSectionContent } from '../SectionMapper';

import { QuestionnaireTiles } from './components/QuestionnaireTiles';
import { AppointmentCTA } from './components/AppointmentCTA';
import { SectionContainer } from '../SectionContainer';

type HeroSectionProps = {
  id: string;
  content: HeroSectionContent;
};

export const HeroSection: React.FC<HeroSectionProps> = (props) => {
  const { title, subtitle, questionnaire } = props.content;

  // Don't use the background image for now
  // ––
  // const BackgroundImage = useMemo(() => {
  //   const backgroundImage = props.content.background_image?.data.attributes;
  //   return backgroundImage ? (
  //     <Image
  //       src={backgroundImage.url}
  //       alt={backgroundImage.alternativeText ?? ''}
  //       layout="fill"
  //       objectFit="cover"
  //       className="rounded-2xl"
  //       quality={90}
  //       priority
  //     />
  //   ) : null;
  // }, [props.content.background_image?.data.attributes]);

  const Headline = useMemo(() => {
    return title ? (
      <h1
        className="text-[3.5rem] leading-tight text-[white] [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]"
        // Allow line breaks and markup to be inserted via cms
        dangerouslySetInnerHTML={{ __html: title }}
      />
    ) : null;
  }, [title]);

  const Subtitle = useMemo(() => {
    return subtitle ? (
      <span
        className="-mt-16 block text-[3.5rem] font-bold leading-tight text-[white] opacity-80 [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]"
        // Allow line breaks and markup to be inserted via cms
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    ) : null;
  }, [subtitle]);

  return (
    <SectionContainer id={props.id}>
      <div className="relative">
        <div className="absolute top-0 left-0 -z-20 h-full w-full">
          {/* {BackgroundImage} */}
          <div className="h-full w-full rounded-2xl bg-primary opacity-90" />
        </div>
        <div className="mx-auto flex flex-col justify-center px-12 py-28 text-center">
          <div>
            {Headline}
            {Subtitle}
            <p className="my-8 mx-auto max-w-xl text-xl text-[white] [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]">
              {props.content.description}
            </p>
          </div>
          {props.content.funnel === 'Appointment' ? (
            <AppointmentCTA />
          ) : (
            <QuestionnaireTiles content={questionnaire} />
          )}
        </div>
      </div>
    </SectionContainer>
  );
};
