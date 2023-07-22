import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = req.body;

    const url = `${process.env.ODOO_INSTANCE_URL}/api/leads`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_id: data.company_id,
        first_name: data.contact.firstName,
        last_name: data.contact.lastName,
        phone_number: data.contact.phone,
        email_address: data.contact.email,
      }),
    });
    if (!response.ok) {
      throw new Error(`Odoo API request failed with status ${response.status}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Odoo API request failed with error: ${result.error}`);
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Fetch error', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
