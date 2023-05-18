import type { NextApiRequest } from 'next';

export const validateRequestBody = (
  req: NextApiRequest,
): { questionnaireId?: string } => {
  try {
    if (req.method !== 'GET' && req.method !== 'OPTIONS')
      throw new Error('Unsupported HTTP method.');

    const questionnaireId = req.query.questionnaire;

    if (Array.isArray(questionnaireId)) {
      throw new Error('Invalid questionnaire id provided.');
    }

    if (!questionnaireId) {
      throw new Error('No questionnaire id provided.');
    }

    return { questionnaireId };
  } catch (error) {
    throw error;
  }
};
