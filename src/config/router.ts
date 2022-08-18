import Router, { RouterOptions } from 'vue-router';
import Vue from 'vue';
import { isKfb, isSsc } from '@/config/app';
import KfbRouterOptions from './kfb/router';
import SscRouterOptions from './ssc/router';

Vue.use(Router);

export function createRouter(): Router {
  let routerOptions: RouterOptions = {};
  if (isKfb) {
    routerOptions = KfbRouterOptions;
  } else if (isSsc) {
    routerOptions = SscRouterOptions;
  }

  return new Router(routerOptions);
}
