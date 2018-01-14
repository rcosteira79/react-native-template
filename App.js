import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Font, AppLoading, Util, Asset } from 'expo';
import { initialize, addTranslationForLanguage, setActiveLanguage } from 'react-localize-redux';
import { Tester, TestHookStore } from 'cavy';

import './src/resources/colors';
import { persistor, store } from './src/store';
import AppWithNavigationState from './src/navigation';
import { GLOBAL } from './src/services/helpers';
import * as testSuites from './specs/itSuites';

const montserratMedium = require('./src/resources/fonts/Montserrat-Medium.ttf');
const montserratLight = require('./src/resources/fonts/Montserrat-Light.ttf');
const montserratRegular = require('./src/resources/fonts/Montserrat-Regular.ttf');

const fonts = {
  'Montserrat-Medium': montserratMedium,
  'Montserrat-Light': montserratLight,
  'Montserrat-Regular': montserratRegular
};

const en = require('./src/resources/locales/en.json');
const pt = require('./src/resources/locales/pt.json');

const logo = require('./src/resources/images/logo.png');

const images = [logo];

const languages = ['pt', 'en'];

function cacheFonts() {
  return Font.loadAsync(fonts);
}

function loadLocalizationAsync() {
  return Util.getCurrentLocaleAsync().then(locale => {
    const defaultLanguage = getDefaultLanguage(locale);

    store.dispatch(setActiveLanguage(defaultLanguage || 'pt'));
  });
}

function getDefaultLanguage(locale) {
  return languages.find(language => {
    return String(locale).startsWith(language);
  });
}

function cacheImages() {
  return images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });
}

class App extends React.Component {
  state = {
    assetsReady: false
  };

  componentWillMount() {
    store.dispatch(initialize(languages, { defaultLanguage: 'pt' }));
    store.dispatch(addTranslationForLanguage(pt, 'pt'));
    store.dispatch(addTranslationForLanguage(en, 'en'));

    this.loadAssetsAsync();
  }

  async loadAssetsAsync() {
    const fontAssets = cacheFonts();
    const imageAssets = cacheImages();
    const localeAssets = loadLocalizationAsync();

    await Promise.all([fontAssets, imageAssets, localeAssets]);

    this.setState({ assetsReady: true });
  }

  render() {
    const app = (
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <AppWithNavigationState />
        </View>
      </PersistGate>
    );

    if (!this.state.assetsReady) {
      return <AppLoading />;
    }

    if (GLOBAL.DEV) {
      const testHookStore = new TestHookStore();
      const testSuitesArray = Object.keys(testSuites).map(key => testSuites[key]);

      return (
        <Provider store={store}>
          <Tester
            suites={testSuitesArray}
            store={testHookStore}
            waitTime={2000}
            testStartDelay={2000}
            consoleLog
            reporter={false}
            reduxStore={store}
            clearAsyncStorage
          >
            {app}
          </Tester>
        </Provider>
      );
    }

    return <Provider store={store}>{app}</Provider>;
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
