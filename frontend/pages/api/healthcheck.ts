import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { StrapiAPI } from '../../interface/backend';
import { getErrorMessage } from '../../lib/api/error';

export const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<{ status: string }>,
) => {
  try {
    const backend = await StrapiAPI.getStaticLandingPageContent();
    if (!backend) throw new Error('Backend not available');
    res.status(200).json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: getErrorMessage(e) });
  }
};

export default withSentry(handler);
