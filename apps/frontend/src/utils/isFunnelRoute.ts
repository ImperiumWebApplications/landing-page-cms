import { NextRouter } from 'next/router';

import {
  appointmentRoute,
  questionnaireRoute,
} from '../config/navigation.config';

export const isFunnelRoute = (router: NextRouter) => {
  return (
    router.pathname.includes(questionnaireRoute) ||
    router.pathname.includes(appointmentRoute)
  );
};
