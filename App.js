import {LogBox} from 'react-native';

// Ignore specific warning messages
LogBox.ignoreLogs([
  'Encountered two children with the same key', // First warning
  'Warning: componentWillReceiveProps has been renamed', // Another warning
  'VirtualizedLists should never be nested', // Another example warning
  'ViewPropTypes will be removed from React Native, along with all other PropTypes',
]);

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
import Toast from 'react-native-toast-message';
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  WarningToast,
} from '@components/toast';

const toastConfig = {
  success: ({props}) => <SuccessToast {...props} />,
  error: ({props}) => <ErrorToast {...props} />,
  warning: ({props}) => <WarningToast {...props} />,
  info: ({props}) => <InfoToast {...props} />,
};

setI18nConfig();
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <ApplicationProvider {...eva} theme={{...eva.light}}>
              <Navigation />
              <Toast config={toastConfig} />
            </ApplicationProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
