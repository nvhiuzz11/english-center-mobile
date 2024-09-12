import {
  persistReducer,
  persistStore,
  PersistConfig,
  createTransform,
} from 'redux-persist';
import {applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

// let updateModelTransformer = createTransform(
//   inboundState => inboundState,
//   (outboundState, key) => {
//     return outboundState;
//   },
// );

const persistConfig: PersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['account', 'settings', 'app'],
  timeout: null,
  debounce: 100,
};

const _persistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: _persistReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Allow non-serializable values
    }),
});

export const persistor = persistStore(store);
