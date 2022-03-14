import { loadEnvConfig } from '@next/env';

const setupEnv = async () => {
  loadEnvConfig(process.cwd());
};

export default setupEnv;
