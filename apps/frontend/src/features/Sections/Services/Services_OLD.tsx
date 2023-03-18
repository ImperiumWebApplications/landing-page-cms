import { useState } from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SectionContainer } from '../SectionContainer';
import { ServicesSectionContent } from '../SectionMapper';
import { ProgressBar } from './components/ProgressBar';

type ServicesSectionProps = {
  id: string;
  content: ServicesSectionContent;
};

export const Services_OLD: React.FC<ServicesSectionProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  console.log(props);
  if (!props.content.service_tab?.length) return <></>;

  const activeTabContent = props.content.service_tab[activeTab];

  return (
    <SectionContainer id={props.id} className="my-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div
          data-testid="services-tab-header"
          className="scrollbar-hide -mx-4 mb-8 flex overflow-x-auto whitespace-nowrap p-4 pb-2 md:m-0 md:mb-16 md:items-stretch md:justify-center md:whitespace-normal md:p-0"
        >
          {props.content.service_tab.map(({ tab_name }, i) => {
            return tab_name ? (
              <button
                type="button"
                key={i}
                onClick={() => setActiveTab(i)}
                className={`max-w-[12rem] flex-shrink-0 cursor-pointer whitespace-pre-wrap border-r-[1px] border-l-[1px] border-dashed border-[white] py-4 px-8 font-normal tracking-wide first-of-type:rounded-tl-md first-of-type:rounded-bl-md first-of-type:border-l-0 last-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:border-r-0 hover:brightness-95 md:max-w-none md:flex-shrink md:whitespace-normal ${
                  i === activeTab
                    ? 'bg-secondary text-[white]'
                    : 'bg-tertiary text-primary'
                }`}
              >
                {tab_name}
              </button>
            ) : null;
          })}
        </div>
        <div
          data-testid="services-tab-content"
          className="grid grid-flow-row grid-cols-1 md:grid-cols-[60%_40%] md:grid-rows-1 lg:grid-cols-2"
        >
          <div className="md:mr-20">
            <h2 className="mb-8 text-4xl text-secondary">
              {activeTabContent.title}
            </h2>
            <p className="mb-4 font-semibold">{activeTabContent.subtitle}</p>
            <p>{activeTabContent.description}</p>
            <div className="mt-8 mr-8 md:mt-16 md:mr-16">
              <ProgressBar label="Kundenzufriedenheit" value={98} />
              {props.content.serviceType ? (
                <ProgressBar
                  label={`Kompetenz der ${props.content.serviceType}`}
                  value={100}
                />
              ) : null}
              <ProgressBar label="Erfolgreiche Vermittlungen" value={92} />
            </div>
          </div>
          <div>
            {activeTabContent.service_images?.data?.length && (
              <Swiper modules={[Navigation, A11y]} navigation loop>
                {activeTabContent.service_images.data.map((image, i) => {
                  return image.attributes ? (
                    <SwiperSlide key={i}>
                      <div className="relative h-[380px] w-full rounded-md">
                        <Image
                          src={image.attributes.url}
                          alt={image.attributes.alternativeText ?? ''}
                          className="rounded-md object-cover"
                          quality={90}
                          sizes="(max-width: 640px) 100vw, 640px"
                          fill
                        />
                      </div>
                    </SwiperSlide>
                  ) : null;
                })}
              </Swiper>
            )}
            <div className="mt-8">
              {activeTabContent.service_examples && (
                <>
                  <h3 className="mb-2 text-base uppercase tracking-wide">
                    Beispielarbeiten:
                  </h3>
                  {
                    <div
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: `<span class="mr-2">${activeTabContent.service_examples.replace(
                          /\n/g,
                          '</span><span class="text-secondary font-bold mr-2">•</span><span class="mr-2">',
                        )}</span>`,
                      }}
                    />
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
