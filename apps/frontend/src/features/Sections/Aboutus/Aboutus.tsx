import React from 'react';
import { AboutUsSectionContent } from '../SectionMapper';
import { StaticContent } from '../../../lib/strapi';
import { SectionContainer } from '../SectionContainer';

type AboutUsSectionProps = {
  content: AboutUsSectionContent;
  staticContent: StaticContent['about_us_section'];
};

export const AboutUsSection: React.FC<AboutUsSectionProps> = (props) => {
  console.log('Content received is', props.content);
  // Extracting content from props
  const { title, description, aboutus_image, enabled } = props.content;
  const imageSrc = aboutus_image?.data?.attributes?.url;

  return enabled ? (
    <SectionContainer>
      <div className="mx-auto flex max-w-[1400px] justify-between py-24">
        {/* Content */}
        <div className="flex w-1/2 flex-col pr-12">
          <h2 className="mb-4 text-2xl font-bold">{title}</h2>
          <p className="text-base">{description}</p>
        </div>

        {/* Image */}
        <div className="w-1/2">
          <img src={imageSrc} alt="About Us Image" />
        </div>
      </div>
    </SectionContainer>
  ) : (
    <></>
  );
};
