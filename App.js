import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';

import * as eva from '@eva-design/eva';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Navigation} from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <ApplicationProvider {...eva} theme={{...eva.light}}>
          <Navigation />
        </ApplicationProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
