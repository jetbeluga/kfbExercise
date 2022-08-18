import type { VNode } from 'vue';

import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    return (): VNode => <div>Testbed</div>;
  },
});
