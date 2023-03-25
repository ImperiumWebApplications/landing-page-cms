import { useMemo } from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';

import type { HeroSectionContent } from '../SectionMapper';

import { QuestionnaireTiles } from './components/QuestionnaireTiles';
import { Steps } from './components/Steps';
import { SectionContainer } from '../SectionContainer';

type HeroSectionProps = {
  id: string;
  content: HeroSectionContent;
};

export const HeroSection: React.FC<HeroSectionProps> = (props) => {
  const { title, subtitle, questionnaire } = props.content;

  const BackgroundImage = useMemo(() => {
    const backgroundImage = props.content.background_image?.data?.attributes;
    return backgroundImage ? (
      <div className="relative h-full">
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alternativeText ?? ''}
          className="z-0 h-full max-h-[640px] w-full rounded-tr-md object-cover pl-16 lg:pl-4"
          quality={90}
          fill
          priority
        />
      </div>
    ) : null;
  }, [props.content.background_image?.data?.attributes]);

  const Headline = useMemo(() => {
    return title ? (
      <h1
        className="text-3xl font-bold !leading-tight text-primary md:text-4xl lg:text-[42px]"
        // Allow line breaks and markup to be inserted via cms
        dangerouslySetInnerHTML={{ __html: title }}
      />
    ) : null;
  }, [title]);

  const Subtitle = useMemo(() => {
    return subtitle ? (
      <span
        className="mt-2 block text-lg font-normal text-secondary md:mt-8 md:text-xl"
        // Allow line breaks and markup to be inserted via cms
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    ) : null;
  }, [subtitle]);

  return (
    <SectionContainer id={props.id} fullWidth>
      <motion.div
        className="relative mx-auto flex max-w-[1400px] flex-col bg-tertiary md:-mt-[150px] md:grid md:grid-cols-6 md:grid-rows-4 md:rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-3">
          <div className="content-wrapper">
            <div className="max-w-md py-6 md:pb-0 md:pt-36">
              {Headline}
              {Subtitle}
            </div>
          </div>
        </div>
        <div className="hidden md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-5 md:block">
          {BackgroundImage}
        </div>
        <div className="relative bg-[white] md:z-10 md:col-start-1 md:col-end-7 md:row-start-3 md:row-end-6 md:bg-[unset]">
          <div className="content-wrapper md:pt-4 md:pb-32">
            <QuestionnaireTiles content={questionnaire} />
          </div>
        </div>
      </motion.div>
      <Steps />
    </SectionContainer>
  );
};
