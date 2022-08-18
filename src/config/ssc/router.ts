import { RouterOptions } from 'vue-router';
import HomePage from '@/components/home-page/HomePage.vue';

const routerOptions: RouterOptions = {
  mode: 'history',

  routes: [
    {
      path: '/',
      component: HomePage,
    },
  ],
};

export default routerOptions;
