import { Sections } from '../backend-api';

export enum SectionMapping {
  // eslint-disable-next-line
  Hero = 'sections.hero',
  // eslint-disable-next-line
  Statistics = 'sections.statistics',
  // eslint-disable-next-line
  CallToAction = 'sections.call-to-action',
  // eslint-disable-next-line
  Reviews = 'sections.reviews',
  // eslint-disable-next-line
  Images = 'sections.images',
  // eslint-disable-next-line
  Video = 'sections.video',
}

export const mapSectionsDataToSectionComponents = (
  sections: Sections[] | undefined,
) => {
  const sectionObject = {} as { [sectionComponentId: string]: Sections };
  if (!sections || !sections.length) return sectionObject;

  sections.forEach((sectionData) => {
    sectionObject[sectionData.__component] = sectionData;
  });
  return sectionObject;
};
