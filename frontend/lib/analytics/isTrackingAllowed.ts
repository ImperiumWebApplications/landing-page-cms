import { isDevEnvironment } from '../../utils/isDevEnvironment';
import { isTestEnvironment } from '../../utils/isTestEnvironment';

export const isTrackingAllowed = (host: string) =>
  !isDevEnvironment(host) && !isTestEnvironment();
