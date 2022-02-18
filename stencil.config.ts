import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import dotenv from 'dotenv';

dotenv.config();

export const config: Config = {
  namespace: 'components',
  env: {
    infuraId: process.env.INFURA_ID,
  },
  rollupPlugins: {
    after: [
      // Plugins injected after commonjs()
      nodePolyfills()
    ]
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
