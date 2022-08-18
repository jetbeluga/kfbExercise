/* eslint-disable @typescript-eslint/no-unused-vars */

import { VNode } from 'vue';
import { ComponentRenderProxy } from '@nuxtjs/composition-api';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elem: string]: any;
    }
  }
}
