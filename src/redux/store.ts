import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import all reducers here
import authSlice from './slices/authSlice';
import { authService } from './services/authService';
import { cityService } from './services/cityServices';
import citiesdataSlice from './slices/citiesdataSlice';
import apartmentsDataSlice from './slices/apartmentsSlice';
import flatsDataSlice from './slices/flatsSlice';


const rootReducers = combineReducers({
  auth: authSlice,
  cityData:citiesdataSlice,
  apartmentsData:apartmentsDataSlice,
  flatsData:flatsDataSlice,
  [authService.reducerPath]: authService.reducer,
  [cityService.reducerPath]: cityService.reducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authService.middleware,
      cityService.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
