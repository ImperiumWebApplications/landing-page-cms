import type { NextApiRequest, NextApiResponse } from 'next';

import { captureNextAPIError, getErrorMessage } from '../../lib/next/api/error';
import { sendMail, validateRequestBody } from '../../lib/next/api/send-mail';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = validateRequestBody(req);

    await sendMail(data);

    res.status(200).json({ success: true });
  } catch (error) {
    captureNextAPIError(error);
    const message = getErrorMessage(error);
    res.status(500).json({ success: false, message });
  }
};

export default handler;
