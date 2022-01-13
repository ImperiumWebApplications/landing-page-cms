import { NextRouter } from 'next/router';

import { questionnaireRoute } from '../config/navigation.config';

export const isFunnelRoute = (router: NextRouter) => {
  return router.pathname.includes(questionnaireRoute);
};
