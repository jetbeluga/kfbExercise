import { ActionTree, GetterTree, MutationTree, Store } from 'vuex';
import { AppDefaultLocale } from '@/config/localization';
import { Locale } from '@/utilities/localization/localization';

export interface State {
  localization: {
    activeLocale: Locale;
    defaultLocale: Locale;
  };
}

export function state(): State {
  return {
    localization: {
      activeLocale: AppDefaultLocale,
      defaultLocale: AppDefaultLocale,
    },
  };
}

export const getters: GetterTree<State, State> = {};

export const mutations: MutationTree<State> = {
  setActiveLocale(s, language: Locale) {
    s.localization.activeLocale = language;
  },
};

export const actions: ActionTree<State, State> = {};

export function useTestStore(testState: State | null = null): Store<State> {
  return new Store<State>({
    state: testState ?? state(),
    actions,
    mutations,
    getters,
  });
}
