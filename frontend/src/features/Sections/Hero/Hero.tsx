import { useMemo } from 'react';

import { motion } from 'framer-motion';

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
        className="mb-2 text-4xl text-[white] [text-shadow:0_4px_8px_rgba(0,0,0,0.2)] md:text-5xl xl:mb-4 xl:text-[3.5rem]"
        // Allow line breaks and markup to be inserted via cms
        dangerouslySetInnerHTML={{ __html: title }}
      />
    ) : null;
  }, [title]);

  const Subtitle = useMemo(() => {
    return subtitle ? (
      <span
        className="block text-xl font-bold text-[white] opacity-80 [text-shadow:0_4px_8px_rgba(0,0,0,0.2)] sm:text-2xl md:text-5xl xl:text-[3.5rem]"
        // Allow line breaks and markup to be inserted via cms
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    ) : null;
  }, [subtitle]);

  return (
    <SectionContainer id={props.id}>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute top-0 left-0 -z-20 h-full w-full">
          {/* {BackgroundImage} */}
          <div className="h-full w-full rounded-2xl bg-primary opacity-90" />
        </div>
        <div className="mx-auto flex flex-col justify-center px-2 py-12 text-center sm:px-4 md:px-12 md:py-28">
          <div>
            {Headline}
            {Subtitle}
            <p className="my-4 mx-auto max-w-xl text-sm text-[white] [text-shadow:0_4px_8px_rgba(0,0,0,0.2)] sm:my-8 sm:text-lg md:text-xl">
              {props.content.description}
            </p>
          </div>
          {props.content.funnel === 'Appointment' ? (
            <AppointmentCTA />
          ) : (
            <QuestionnaireTiles content={questionnaire} />
          )}
        </div>
      </motion.div>
    </SectionContainer>
  );
};
