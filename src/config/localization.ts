import { isKfb } from '@/config/app';
import {
  Locale,
  TranslationDefinition,
} from '@/utilities/localization/localization';
import { KfbTranslations } from '@/config/kfb/translations';
import { SscTranslations } from '@/config/ssc/translations';

let availableLocales: Locale[];
let translations: TranslationDefinition;
let defaultLocale: Locale;

if (isKfb) {
  availableLocales = [Locale.De, Locale.En];
  defaultLocale = Locale.De;
  translations = KfbTranslations;
} else {
  availableLocales = [Locale.En];
  defaultLocale = Locale.En;
  translations = SscTranslations;
}

export const AppLocales = availableLocales;
export const AppTranslations = translations;
export const AppDefaultLocale = defaultLocale;
