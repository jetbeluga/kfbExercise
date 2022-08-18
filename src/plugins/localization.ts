import {
  Localization,
  provideLocalizationInstance,
} from '@/utilities/localization/localization';
import { AppDefaultLocale, AppTranslations } from '@/config/localization';
import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api';

export default defineNuxtPlugin((context) => {
  const localization = new Localization(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    context.store.state.localization.activeLocale ?? AppDefaultLocale,
    {
      namespace: 'root',
      translations: AppTranslations,
    },
    context.store,
  );
  onGlobalSetup(() => {
    provideLocalizationInstance(localization);
  });
});
