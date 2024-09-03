import React, { useCallback, useEffect, useState, useRef } from 'react';
import { I18nManager } from 'react-native';
import Storage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const i18n = new I18n();
export const TranslationContext = React.createContext({});

export const TranslationProvider = ({ children, translations }) => {
  const [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);

  console.log('Setting up translations');
  console.log(`local: ${Localization.getLocales()[0].languageTag} `);
  console.log(`default locale: ${locale} `);

  const localized = useCallback(
    (key, config) => {
      return i18n.t(key, { ...config, locale }).includes('missing')
        ? key
        : i18n.t(key, { ...config, locale })
    },  
    [locale],
  );

  const getLocale = useCallback(async () => {
    const localeJSON = await Storage.getItem('locale');
    console.log(
      `getting locale from Storage and writing it to memory ${localeJSON}`,
    );

    // If we have a locale stored in local storage, that is high priority (it overrides the current device locale)
    setLocale(localeJSON !== null ? localeJSON : Localization.getLocales()[0].languageTag);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    console.log(`write to storage locale: ${locale}`);
    Storage.setItem('locale', locale);
    // console.log(translations[locale]); // in ra bản dịch
    setI18nConfig();
  }, [locale]);

  const setI18nConfig = () => {
    i18n.defaultLocale = "en";
    i18n.translations = translations;
    i18n.locale = locale;
    i18n.enableFallback = true;
    I18nManager.forceRTL(Localization.getLocales()[0].textDirection === 'rtl' ? true : false);
  };

  const value = {
    localized,
    setAppLocale: setLocale,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}