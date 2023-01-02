import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

import {
  appointmentRoute,
  questionnaireRoute,
} from '../../../config/navigation.config';
import { ArrowRightCircleIcon, PlayIcon } from '../../../components/Icons';
import { Button } from '../../../components/Button';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

import { SectionContainer } from '../SectionContainer';
import type { VideoSectionContent } from '../SectionMapper';
import { useSectionContext } from '../SectionContext';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type VideoSectionProps = {
  id: string;
  content: VideoSectionContent;
};

export const VideoSection: React.FC<VideoSectionProps> = (props) => {
  const isTabletBreakpoint = useMediaQuery(`(min-width: 768px)`);
  const { state } = useSectionContext();

  return (
    <SectionContainer id={props.id} className="my-12">
      <div className="flex flex-col-reverse items-center justify-start gap-x-12 lg:flex-row lg:py-24">
        <div className="max-w-md">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>{props.content?.video_title}</h2>
            <div className="mt-6 mb-16">
              {props.content?.video_description ? (
                <ReactMarkdown>{props.content.video_description}</ReactMarkdown>
              ) : undefined}
            </div>
            <Button
              variant="secondary"
              className="text-[0.9rem] uppercase"
              to={`/${
                state.funnelTarget === 'Appointment'
                  ? appointmentRoute
                  : questionnaireRoute
              }`}
              label={
                state.funnelTarget === 'Appointment'
                  ? 'Termin vereinbaren'
                  : 'Beratung starten'
              }
              Icon={<ArrowRightCircleIcon className="h-5 w-5" />}
            />
          </motion.div>
        </div>
        <div className="relative mx-auto mt-8 mb-16 lg:my-0">
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, translateX: 10 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            className='group before:absolute before:-right-[10px] before:-top-[10px] before:z-10 before:h-[60px] before:w-[300px] before:rounded-lg before:bg-secondary before:content-[""] after:absolute after:-left-[10px] after:-bottom-[10px] after:z-10 after:h-[60px] after:w-[60px] after:rounded-lg after:bg-primary after:content-[""]'
          >
            <ReactPlayer
              width={isTabletBreakpoint ? '640px' : '90vw'}
              url="/videos/video_b690cf2964.mp4"
              light="/images/video_thumbnail_643e7caa05.jpg"
              playing={true}
              controls={true}
              style={{
                position: 'relative',
                zIndex: 12,
                backgroundColor: 'var(--color-tertiary)',
              }}
              playIcon={
                <button
                  className="relative z-20 h-16 w-16 cursor-pointer rounded-md border-none bg-secondary shadow-md transition-all group-hover:scale-90 group-hover:shadow-lg"
                  type="button"
                  aria-label="Play Video"
                >
                  <PlayIcon fill="white" className="mx-auto h-8 w-8" />
                </button>
              }
            />
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};
