import React, { useMemo } from 'react';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { ArrowRight, CheckCircleIcon } from '../../../components/Icons';
import { CallToActionBanner } from '../../../components/Banner';
import { Workflow } from './components/Workflow';

import { SectionContainer } from '../SectionContainer';
import { ServicesSectionContent } from '../SectionMapper';
import { Services_OLD } from './Services_OLD';
import { useSectionContext } from '../SectionContext';

type ServicesSectionProps = {
  id: string;
  content: ServicesSectionContent;
};

export const ServicesSection: React.FC<ServicesSectionProps> = (props) => {
  const { state } = useSectionContext();

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

  if (props.content.service_tab?.length && !state.isNewDesign)
    return <Services_OLD {...props} />;

  return (
    <SectionContainer id={props.id} className="my-8 md:my-[70px]" fullWidth>
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
          <div className="relative hidden md:block">{ServiceImage}</div>
          <div>
            {props.content.title ? (
              <h2
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
        <CallToActionBanner
          data-testid="services-cta"
          description="Wir helfen Ihnen unverbindlich und kostenlos, den besten Profi zu finden."
          className="my-12 md:my-20"
        />
      </div>
      <div className="mx-auto -mt-32 max-w-[1400px] bg-tertiary pt-36 pb-10 md:-mt-[10.5rem] md:rounded-md md:pb-20 md:pt-36">
        <div className="content-wrapper">
          <h2 className="mb-4 text-base leading-tight md:mb-8 md:text-2xl">
            Absolut kosten- und risikofreie Anfrage senden!
          </h2>
          <Workflow className="my-8 md:my-16" />
          <div className="mt-12 text-center text-primary md:mt-0">
            <span className="font-bold">Unser Service</span>
            <div className="block md:inline-block">
              <ArrowRight
                aria-hidden="true"
                className="mx-4 hidden stroke-primary md:inline-block"
                strokeWidth={2}
              />
              <CheckCircleIcon
                aria-hidden="true"
                className="mr-2 inline-block h-4 w-4 fill-primary md:hidden"
              />
              <span className="text-sm md:text-base">
                100% kostenlos & unverbindlich
              </span>
            </div>
            <div className="block md:inline-block">
              <ArrowRight
                aria-hidden="true"
                className="mx-4 hidden stroke-primary md:inline-block"
                strokeWidth={2}
              />
              <CheckCircleIcon
                aria-hidden="true"
                className="mr-2 inline-block h-4 w-4 fill-primary md:hidden"
              />
              <span className="text-sm md:text-base">
                Keine Auftragspflicht
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
