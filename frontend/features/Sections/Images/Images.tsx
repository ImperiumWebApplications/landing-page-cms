import Image from 'next/image';

import { Animation } from '../../../components/Animation/Animation';
import { Button } from '../../../components/Button';
import { startQuestionnaire } from '../../../config/navigation.config';

import { ImagesSectionContent } from '../SectionMapper';
import { SectionContainer } from '../SectionContainer';
import { ArrowRightCircleIcon } from '../../../components/Icons';

type ImagesSectionProps = {
  id: string;
  content: ImagesSectionContent;
};

export const ImagesSection: React.FunctionComponent<ImagesSectionProps> = (
  props,
) => {
  return (
    <SectionContainer id={props.id}>
      <div className="hidden sm:relative sm:mb-12 sm:grid sm:grid-flow-row sm:grid-cols-2 sm:gap-2 md:grid-cols-3">
        {props.content.images?.data?.length &&
          props.content.images.data.map((image, i) => {
            return image.attributes ? (
              <div
                key={i}
                className="images-wrapper relative h-40 w-full max-w-md"
              >
                <Image
                  src={image.attributes.url}
                  alt={image.attributes.alternativeText ?? ''}
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                />
              </div>
            ) : (
              <></>
            );
          })}
      </div>
      <Animation type="fadeUp" duration={300} delay={300}>
        <div className="mt-8 mb-12 flex max-w-7xl flex-col items-start justify-start gap-20 lg:flex-row">
          <div className="mb-8 text-4xl font-semibold tracking-tighter opacity-75 xl:text-5xl">
            Konnten wir Sie überzeugen?
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
            <div className="flex w-full flex-col gap-4">
              <span>Lassen sie sich beraten</span>
              <Button
                variant="secondary"
                size="large"
                to={startQuestionnaire.href}
                label={startQuestionnaire.label}
                Icon={<ArrowRightCircleIcon className="h-5 w-5" />}
              />
            </div>
            {props.content.phone && (
              <div className="flex w-full flex-col gap-4">
                <span>Oder rufen Sie einfach an</span>
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
      </Animation>
    </SectionContainer>
  );
};
