import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { MenuProvider } from 'react-native-popup-menu';
import {
  DopebaseProvider,
  extendTheme,
  TranslationProvider,
} from './src/core/dopebase'
import AppContent from './src/AppContent';
import translations from './src/translations/';
import { ConfigProvider } from './src/config';

import MobileTheme from './src/theme';

const App = () => {
  const theme = extendTheme(MobileTheme);

  useEffect(() => {
    SplashScreen.hide()
    LogBox.ignoreAllLogs(true)
  }, [])
  return (
    <TranslationProvider translations={translations}>
      <DopebaseProvider theme={theme}>
        <ConfigProvider>
          <AppContent />
        </ConfigProvider>
      </DopebaseProvider>
    </TranslationProvider>
  )
}

export default App;