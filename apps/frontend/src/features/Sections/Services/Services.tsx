import React, { useMemo } from 'react';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import type { StaticContent } from '../../../lib/strapi';
import { CheckCircleIcon } from '../../../components/Icons';
import { ServiceProcess } from './components/ServiceProcess';

import { SectionContainer } from '../SectionContainer';
import { ServicesSectionContent } from '../SectionMapper';
// import { Services_OLD } from './Services_OLD';

type ServicesSectionProps = {
  content: ServicesSectionContent;
  staticContent: StaticContent['services_section'];
};

export const ServicesSection: React.FC<ServicesSectionProps> = (props) => {
  const ServiceImage = useMemo(() => {
    const { url, alternativeText, name } =
      props.content.service_image?.data?.attributes || {};

    return url ? (
      <Image
        src={url}
        alt={alternativeText ?? name ?? ''}
        className="rounded-lg object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 1000px"
      />
    ) : null;
  }, [props.content.service_image?.data?.attributes]);

  return (
    <SectionContainer
      className="my-8 md:my-[70px]"
      data-section="services"
      fullWidth
    >
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
          <div className="relative hidden md:block">{ServiceImage}</div>
          <div>
            {props.content.title ? (
              <h2
                id={
                  props.staticContent?.navigation_item?.anchor_id ?? undefined
                }
                style={{ scrollMarginTop: '64px' }}
                data-testid="services-headline"
                className="text-base leading-tight md:mb-6 md:text-2xl"
              >
                {props.content.title}
              </h2>
            ) : null}
            {props.content?.description ? (
              <ReactMarkdown className="article text-sm md:text-base">
                {props.content.description}
              </ReactMarkdown>
            ) : null}
            <div className="mt-6 flex flex-col gap-4 md:mt-8 md:mb-12 md:gap-6">
              {props.content.benefits?.map((benefit, i) => {
                return (
                  <div
                    key={i}
                    data-testid="services-benefit"
                    className="flex items-start justify-start gap-3"
                  >
                    <CheckCircleIcon className="block h-7 w-7 flex-shrink-0 fill-secondary" />
                    <div className="text-sm md:text-base">
                      {benefit.title ? (
                        <span className="font-bold">{benefit.title}</span>
                      ) : null}
                      {benefit.description ? (
                        <p>{benefit.description}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ServiceProcess
        className="-mt-32 pt-36 pb-10 md:-mt-[10.5rem] md:pb-20 md:pt-36"
        staticContent={props.staticContent}
      />
    </SectionContainer>
  );
};
