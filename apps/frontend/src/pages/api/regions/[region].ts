import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { region, countries } = req.query;

  try {
    const esRes = await fetch(
      `${process.env.ELASTICSEARCH_SERVER_HOST}/search?region=${region}&countries=${countries}`,
    );
    const data = await esRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Could not load data for region ${region}` });
  }
}
