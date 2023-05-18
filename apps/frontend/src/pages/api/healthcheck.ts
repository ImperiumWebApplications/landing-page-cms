import type { NextApiRequest, NextApiResponse } from 'next';

import { getErrorMessage } from '../../lib/next/api/error';
import { Strapi } from '../../lib/strapi';

export const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<{ status: string }>,
) => {
  try {
    const backend = await Strapi.getStaticContent();
    if (!backend) throw new Error('Backend not available');
    res.status(200).json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: getErrorMessage(e) });
  }
};

export default handler;
