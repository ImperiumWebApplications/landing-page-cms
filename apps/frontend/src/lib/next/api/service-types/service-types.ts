import { Strapi } from '../../../strapi';

export type RelatedServiceTypes = {
  questionnaire: string | undefined;
  relatedServiceTypes: string[];
};

export type GetRelatedServiceTypesQuery = {
  questionnaireId?: string;
};

export const getRelatedServiceTypes = async ({
  questionnaireId,
}: GetRelatedServiceTypesQuery): Promise<RelatedServiceTypes> => {
  if (questionnaireId) {
    const data = await Strapi.getRelatedLandingPages(questionnaireId);

    const serviceTypes = data
      .filter((landingPage) => landingPage.attributes.service_type)
      .map((landingPage) => landingPage.attributes.service_type) as string[];

    return {
      questionnaire: questionnaireId,
      relatedServiceTypes: serviceTypes,
    };
  }

  return {
    questionnaire: questionnaireId,
    relatedServiceTypes: [],
  };
};
