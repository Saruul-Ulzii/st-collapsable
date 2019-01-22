import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stcollapsable',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
