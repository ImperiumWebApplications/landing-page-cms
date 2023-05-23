import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

import type { StaticContent } from '../../../lib/strapi/model';
import { getLanguageLocale } from '../../../lib/strapi/utils/getLanguageLocale';
import { useLanguageContext } from '../../../context/Language';
import { questionnaireRoute } from '../../../config/navigation.config';
import { ArrowRight } from '../../../components/Icons';
import { Button } from '../../../components/Button';

import { SectionContainer } from '../SectionContainer';
import type { VideoSectionContent } from '../SectionMapper';

import { VideoPlayer } from './components/VideoPlayer';
import { Statistics } from './components/Statistics';

type VideoSectionProps = {
  content: VideoSectionContent;
  staticContent: StaticContent['video_section'];
};

export const VideoSection: React.FC<VideoSectionProps> = (props) => {
  const { language } = useLanguageContext();

  const thumbnailUrl =
    props.content.video_thumbnail?.data?.attributes?.url ??
    props.staticContent?.video_thumbnail?.data?.attributes?.url;

  const video = props.content.video?.data ?? props.staticContent?.video?.data;
  const videoUrl = video?.attributes?.url;

  if (!videoUrl) return null;

  return (
    <SectionContainer data-section="video" fullWidth>
      <div className="relative mx-auto max-w-[1400px] overflow-hidden">
        <div className="diagonal-bg-clip absolute top-[15%] left-0 -z-10 h-full w-[1400px] md:top-[20%] lg:top-[40%]" />
        <div className="content-wrapper mt-8 flex flex-col items-center justify-start gap-x-12 md:mt-16 lg:mt-0 lg:flex-row lg:py-24">
          <div className="max-w-[490px]">
            <motion.div
              id={props.staticContent?.navigation_item?.anchor_id ?? undefined}
              style={{ scrollMarginTop: '64px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h2 className="text-base leading-tight md:text-2xl">
                {props.content?.video_title}
              </h2>
              <div className="mb-4 md:mt-2 lg:mb-12">
                {props.content?.video_description ? (
                  <ReactMarkdown className="article text-sm md:text-base">
                    {props.content.video_description}
                  </ReactMarkdown>
                ) : undefined}
              </div>
              {props.staticContent?.call_to_action_button_label ? (
                <div className="mx-auto flex-shrink-0 md:mx-0">
                  <Button
                    data-testid="video-button"
                    variant="secondary"
                    className="w-auto text-[0.9rem]"
                    to={`/${questionnaireRoute}`}
                    label={props.staticContent?.call_to_action_button_label}
                    Icon={<ArrowRight className="stroke-[white]" />}
                  />
                </div>
              ) : null}
            </motion.div>
          </div>
          <div className="relative mx-auto mt-8 mb-8 md:mb-16 lg:my-0">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, translateX: 10 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              data-testid="video-wrapper"
              className="group"
            >
              <VideoPlayer url={videoUrl} thumbnail={thumbnailUrl} />
            </motion.div>
          </div>
        </div>
        <motion.div
          className="content-wrapper"
          viewport={{ once: true }}
          initial={{ opacity: 0, translateY: 20 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <Statistics
            items={props.content.statistics}
            locale={getLanguageLocale(language)}
          />
        </motion.div>
      </div>
    </SectionContainer>
  );
};
