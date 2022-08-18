import {
  Locale,
  TranslationDefinition,
} from '@/utilities/localization/localization';

const translations: TranslationDefinition = {
  [Locale.En]: {
    applicationName: 'Seascanner',
    homePage: { selectedTravelDate: 'selected travel date' },
  },
  [Locale.De]: {
    applicationName: 'Seascanner',
    homePage: { selectedTravelDate: 'ausgewähltes Reisedatum' },
  },
};

export const SscTranslations = translations;
