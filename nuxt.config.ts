import type { NuxtConfig } from '@nuxt/types';
import type { PluginItem } from '@babel/core';

import 'tsconfig-paths/register';
import Sass from 'sass';
import { isProd } from '@/config/app';

const css: string[] = ['normalize.css/normalize.css', '@/style/fonts.css'];

const appEnv = process.env.KFB_APP || '';

const config: NuxtConfig = {
  env: {
    KFB_APP: appEnv,
  },

  dev: !isProd,

  srcDir: 'src',

  plugins: ['@/plugins/localization'],

  css,

  dir: {
    layouts: 'components/layouts',
  },

  robots: {
    UserAgent: '*',
    Disallow: '/',
  },

  buildModules: [
    '@nuxt/typescript-build',
    [
      '@nuxtjs/router',
      {
        path: 'src/config',
        fileName: 'router.ts',
      },
    ],
    '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api',
  ],

  build: {
    babel: {
      plugins: ['babel-preset-vca-jsx/src/babel-sugar-setup-ref.js'],
      presets({ isServer }): PluginItem[] {
        let targets = {};
        if (isServer) {
          targets = { node: 'current' };
        }

        return [
          [
            '@vue/babel-preset-jsx',
            {
              compositionAPI: true,
            },
          ],
          [
            '@nuxt/babel-preset-app',
            {
              targets,
              corejs: 3,
            },
          ],
        ];
      },
    },
    extend(conf, context): void {
      if (context.isDev) {
        conf.devtool = context.isClient ? 'source-map' : 'inline-source-map';
      }

      // We do not want to ship fs-module for client-side application (obviously it would fail in the browser)
      conf.node = {
        fs: 'empty',
      };
    },
    devtools: !isProd,
    extractCSS: true,
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'no-autoplace',
        },
      },
    },
    loaders: {
      scss: {
        implementation: Sass,
        additionalData: `$KFB_APP: ${appEnv} ;`,
        sassOptions: {
          includePaths: ['src'],
        },
      },
    },
  },
};

// noinspection JSUnusedGlobalSymbols
export default config;
