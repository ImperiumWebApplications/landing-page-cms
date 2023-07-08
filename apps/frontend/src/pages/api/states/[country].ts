import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface ICountryData {
  states: string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { country } = req.query;

  try {
    console.log('Inside the API');
    const filePath = path.join(
      process.cwd(),
      './src/lib/next/api/states/data',
      `${country}.json`,
    );
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data: ICountryData = JSON.parse(fileData);

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Could not load data for country ${country}` });
  }
}
