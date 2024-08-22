import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';
import * as eva from '@eva-design/eva';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigation} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@src/store/index';
import {setI18nConfig} from '@locales/index';

setI18nConfig();
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <ApplicationProvider {...eva} theme={{...eva.light}}>
              <Navigation />
            </ApplicationProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
