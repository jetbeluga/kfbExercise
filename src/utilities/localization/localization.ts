import { Store } from 'vuex';
import { State } from '@/store';
import {
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
  UnwrapRef,
} from '@nuxtjs/composition-api';
import i18next, { i18n, TOptions } from 'i18next';

export enum Locale {
  De = 'de',
  En = 'en',
}

export type TranslationDefinition = {
  [key in Locale]: Record<string, object | string>;
};

export interface ComponentTranslationBundle {
  namespace: string;
  translations: TranslationDefinition;
}

interface TranslationRefs {
  namespace: string;
  ref: Ref<UnwrapRef<string>>;
  key: string;
  defaultValue?: string;
  options?: TOptions;
  language: Locale;
}

interface TranslationFunction {
  (key: string, options?: TOptions, defaultValue?: string): string;
}

interface LoadedNamespaces {
  [key: string]: {
    [key in Locale]?: number;
  };
}

export function isLocale(value: unknown): value is Locale {
  return Object.values<unknown>(Locale).includes(value);
}

export class Localization {
  private readonly i18n: i18n;

  private readonly debug: boolean = false;

  private readonly store: Store<State> | null;

  private translationRefs: TranslationRefs[] = [];

  private readonly defaultComponentTranslationBundle: ComponentTranslationBundle;

  private loadedNamespaces: LoadedNamespaces = {};

  constructor(
    defaultLocale: Locale,
    defaultComponentTranslationBundle: ComponentTranslationBundle,
    store: Store<State> | null,
  ) {
    this.store = store;
    this.defaultComponentTranslationBundle = defaultComponentTranslationBundle;

    this.loadedNamespaces[defaultComponentTranslationBundle.namespace] = {};
    Object.keys(defaultComponentTranslationBundle.translations).forEach(
      (lang) => {
        if (!isLocale(lang)) return;
        this.loadedNamespaces[defaultComponentTranslationBundle.namespace][
          lang
        ] = 1;
      },
    );
    this.i18n = i18next.createInstance({
      initImmediate: false,
      lng: defaultLocale,
      debug: this.debug,
      resources: this.defaultComponentTranslationBundle.translations,
      defaultNS: 'root',
    });

    this.i18n.init().catch((error: string | object | undefined) => {
      throw error;
    });
  }

  public getDefaultComponentTranslationBundle(): ComponentTranslationBundle {
    return this.defaultComponentTranslationBundle;
  }

  public createT(namespace: string): TranslationFunction {
    return (
      key: string,
      options: TOptions | undefined = undefined,
      defaultValue: string | undefined = undefined,
    ) => this.t(key, namespace, options, defaultValue);
  }

  public t = (
    key: string,
    namespace: string = this.defaultComponentTranslationBundle.namespace,
    options: TOptions | undefined = undefined,
    defaultValue: string | undefined = undefined,
  ): string => {
    const translation = ref(this.get(key, namespace, defaultValue, options));
    this.addRef(translation, namespace, key, defaultValue, options);

    return translation.value;
  };

  public getLocale(): Locale {
    return this.i18n.language as Locale;
  }

  public setLocale(lang: Locale): void {
    this.i18n
      .changeLanguage(lang)
      .then(() => {
        if (this.store !== null) {
          this.store.commit('setActiveLocale', lang);
        }
        this.translationRefs.forEach((translationRef) => {
          translationRef.ref.value = this.get(
            translationRef.key,
            translationRef.namespace,
            translationRef.defaultValue,
            translationRef.options,
          );
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  public addComponentTranslation(bundle: ComponentTranslationBundle): void {
    Object.keys(bundle.translations).forEach((lang) => {
      if (!isLocale(lang)) return;

      if (!this.i18n.hasResourceBundle(lang, bundle.namespace)) {
        this.i18n.addResourceBundle(
          lang,
          bundle.namespace,
          bundle.translations[lang],
        );
        if (this.loadedNamespaces[bundle.namespace] === undefined) {
          this.loadedNamespaces[bundle.namespace] = {};
        }

        this.loadedNamespaces[bundle.namespace][lang] = 1;
      } else {
        this.loadedNamespaces[bundle.namespace][lang] =
          (this.loadedNamespaces[bundle.namespace][lang] ?? 0) + 1;
      }
    });
  }

  private get(
    key: string,
    namespace: string,
    defaultValue?: string,
    options?: TOptions,
  ): string {
    let tKey;
    if (namespace !== '') {
      tKey = `${namespace}:${key}`;
    } else {
      // no namespace
      tKey = key;
    }
    return this.i18n.t(tKey, defaultValue, options);
  }

  private addRef(
    translation: Ref<UnwrapRef<string>>,
    namespace: string,
    key: string,
    defaultValue?: string,
    options?: TOptions,
  ): void {
    this.translationRefs.push({
      language: this.getLocale(),
      ref: translation,
      namespace,
      key,
      defaultValue,
      options,
    });
  }

  public unload(bundle: ComponentTranslationBundle): void {
    let hasMultipleUsages = false;
    Object.values(this.loadedNamespaces[bundle.namespace]).forEach(
      (listeners) => {
        if (listeners !== undefined && listeners > 1) {
          hasMultipleUsages = true;
        }
      },
    );

    if (!hasMultipleUsages) {
      Object.keys(bundle.translations).forEach((lang) => {
        if (!isLocale(lang)) return;

        this.i18n.removeResourceBundle(lang, bundle.namespace);
      });

      this.translationRefs = this.translationRefs.filter(
        (translationRef) => translationRef.namespace !== bundle.namespace,
      );
      delete this.loadedNamespaces[bundle.namespace];
    } else {
      Object.keys(this.loadedNamespaces[bundle.namespace]).forEach((lang) => {
        if (!isLocale(lang)) return;

        this.loadedNamespaces[bundle.namespace][lang] =
          (this.loadedNamespaces[bundle.namespace][lang] ?? 1) - 1;
      });
    }
  }
}

const InstanceSymbol: InjectionKey<Localization> = Symbol(
  'localization service',
);

export function provideLocalizationInstance(instance: Localization): void {
  provide(InstanceSymbol, instance);
}

function injectLocalizationInstance(): Localization {
  const instance = inject(InstanceSymbol);
  if (instance === undefined) {
    throw new Error('Localization has not been provided');
  }

  return instance;
}

export function useT(
  translationBundle: ComponentTranslationBundle | null = null,
  onBeforeUnload: ((arg: () => void) => void) | null = null,
): TranslationFunction {
  const instance = injectLocalizationInstance();

  instance.addComponentTranslation(
    instance.getDefaultComponentTranslationBundle(),
  );

  if (translationBundle !== null) {
    instance.addComponentTranslation(translationBundle);
  }

  if (onBeforeUnload !== null) {
    onBeforeUnload(() => {
      if (instance === null || translationBundle === null) return;
      instance.unload(translationBundle);
    });
  }

  return instance.createT(
    translationBundle?.namespace ??
      instance.getDefaultComponentTranslationBundle().namespace,
  );
}

export function useLocalization(): Localization {
  return injectLocalizationInstance();
}
