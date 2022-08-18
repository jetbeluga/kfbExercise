import {
  Locale,
  TranslationDefinition,
} from '@/utilities/localization/localization';

const translations: TranslationDefinition = {
  [Locale.De]: {
    applicationName: 'Kreuzfahrtberater',
    homePage: { selectedTravelDate: 'ausgewähltes Reisedatum' },
  },
  [Locale.En]: {
    applicationName: 'Kreuzfahrtberater',
    homePage: { selectedTravelDate: 'selected travel date' },
  },
};

export const KfbTranslations = translations;
