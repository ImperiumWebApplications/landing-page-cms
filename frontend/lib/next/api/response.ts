import { NextApiResponse } from 'next';

export type DefaultApiRouteResponse = NextApiResponse<{
  success: boolean;
  message?: string;
}>;
