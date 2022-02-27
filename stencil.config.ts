import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';
import rollupCommonjs from '@rollup/plugin-commonjs';
import { sass } from '@stencil/sass';

import dotenv from 'dotenv';

dotenv.config();

export const config: Config = {
  namespace: 'components',
  env: {
    infuraId: process.env.INFURA_ID,
  },
  rollupPlugins: {
    before: [
      replace({
        'process.env.NODE_DEBUG': null,
        'process.env.WALLETLINK_URL': null,
        'process.env.WALLETLINK_VERSION': null,
      }),
      rollupCommonjs({
        transformMixedEsModules: true,
        sourceMap: true,
      }),
    ],
    after: [
      // Plugins injected after commonjs()
      nodePolyfills(),
    ]
  },
  plugins: [
    sass({ includePaths: ['./node_modules'] })
  ],
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
