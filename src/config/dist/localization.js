exports.__esModule = true;
exports.AppDefaultLocale = exports.AppTranslations = exports.AppLocales = void 0;
const app_1 = require('@/config/app');
const localization_1 = require('@/utilities/localization/localization');
const translations_1 = require('@/config/kfb/translations');
const translations_2 = require('@/config/ssc/translations');

let availableLocales;
let translations;
let defaultLocale;
if (app_1.isKfb) {
  availableLocales = [localization_1.Locale.De, localization_1.Locale.En];
  defaultLocale = localization_1.Locale.De;
  translations = translations_1.KfbTranslations;
} else {
  availableLocales = [localization_1.Locale.En];
  defaultLocale = localization_1.Locale.En;
  translations = translations_2.SscTranslations;
}
exports.AppLocales = availableLocales;
exports.AppTranslations = translations;
exports.AppDefaultLocale = defaultLocale;
