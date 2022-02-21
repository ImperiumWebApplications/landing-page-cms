import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error('API throw error test');
  res.status(200).json({ name: 'John Doe' });
};

export default withSentry(handler);
