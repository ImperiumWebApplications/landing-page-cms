import Image from 'next/image';
import { motion } from 'framer-motion';

import {
  appointmentRoute,
  questionnaireRoute,
} from '../../../config/navigation.config';
import { ArrowRightCircleIcon } from '../../../components/Icons';
import { Button } from '../../../components/Button';

import { ImagesSectionContent } from '../SectionMapper';
import { SectionContainer } from '../SectionContainer';
import { useSectionContext } from '../SectionContext';

type ImagesSectionProps = {
  content: ImagesSectionContent;
};

export const ImagesSection: React.FC<ImagesSectionProps> = (props) => {
  const { state } = useSectionContext();

  return (
    <SectionContainer className="my-12">
      <div className="hidden sm:relative sm:grid sm:grid-flow-row sm:grid-cols-2 sm:gap-2 md:grid-cols-3">
        {props.content.images?.data?.length &&
          props.content.images.data.map((image: any, i: any, arr: any) => {
            const isFirstImage = i === 0;
            const isLastImage = i === arr.length - 1;
            return image.attributes ? (
              <div key={i} className="relative h-40 w-full max-w-md">
                <Image
                  src={image.attributes.url}
                  alt={image.attributes.alternativeText ?? ''}
                  className={`object-cover ${
                    isFirstImage ? 'rounded-tl-lg' : ''
                  } ${isLastImage ? 'rounded-br-lg' : ''}`}
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                />
              </div>
            ) : (
              <></>
            );
          })}
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: 10 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="flex max-w-7xl flex-col items-start justify-start gap-8 sm:my-16 lg:flex-row lg:gap-20">
          <div className="text-4xl font-semibold tracking-tighter opacity-75 md:mb-8 xl:text-5xl">
            Konnten wir Sie überzeugen?
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
            <div className="flex w-full flex-col gap-3">
              <span className="text-[0.9rem] font-light uppercase">
                Lassen sie sich beraten
              </span>
              <Button
                variant="secondary"
                size="large"
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
            </div>
            {props.content.phone && (
              <div className="flex w-full flex-col gap-3">
                <span className="text-[0.9rem] font-light uppercase">
                  Oder rufen Sie einfach an
                </span>
                <Button
                  variant="primary"
                  size="large"
                  to={`tel:${props.content.phone}`}
                  label={props.content.phone}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
