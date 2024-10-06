import * as RNLocalize from 'react-native-localize';

import {I18nManager} from 'react-native';
import memoize from 'lodash.memoize';
import {store} from '@store/index';
import {setLanguage} from '@store/reducers/setting';
import dayjs from 'dayjs';
import {I18n} from 'i18n-js';
import {useSelector} from 'react-redux';

const i18n = new I18n();

const translationGetters = {
  en: () => require('./en.json'),
  vi: () => require('./vi.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const LIST_LANGUAGE = [
  {label: 'Tiếng Việt', value: 'vi'},
  {label: 'English', value: 'en'},
];

export const fallback = {languageTag: 'vi'};

export const setI18nConfig = () => {
  const {
    settings: {language},
  } = store.getState();

  // const language2 = useSelector(state => state?.settings?.language);

  // console.log('languag2e', language2);

  // const bestAvailableLanguage = RNLocalize?.findBestLanguageTag(
  //   Object.keys(translationGetters),
  // );

  // dispatch(setAccountInfo({accountInfo: {user: 'Hieu', role: 'parent'}}));

  const languageTag = language || fallback.languageTag;

  translate.cache.clear();

  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
  I18nManager.allowRTL(false);
};

export const changeLanguage = language => {
  return new Promise((resolve, reject) => {
    try {
      const isSupportLanguage =
        Object.keys(translationGetters).includes(language);
      if (isSupportLanguage) {
        translate.cache.clear();
        store.dispatch(setLanguage({language}));
        i18n.translations = {[language]: translationGetters[language]()};
        i18n.locale = language;
        resolve(language);
      }
      reject('Not found translate');
    } catch (error) {
      console.log(error);
      reject("Can't change language");
    }
  });
};

export const i18nDayJS = time => {
  return dayjs(time).locale(i18n.locale);
};

export default i18n;
