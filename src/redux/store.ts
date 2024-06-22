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
import prepaidMetersSlice from './slices/prepaidMetersSlice';
import { myAccountService, profileService } from './services/myAccountService';
import currentCustomerSlice from './slices/currentCustomerSlice';
import { prepaidMeterService } from './services/prepaidMeterService';
import apartmentPrepaidMetersList from './slices/apartmentPrepaidMetersList';
import { maintainenceService } from './services/maintainenceService';
import { expancesService } from './services/expansesServices';


const rootReducers = combineReducers({
  auth: authSlice,
  cityData:citiesdataSlice,
  apartmentsData:apartmentsDataSlice,
  flatsData:flatsDataSlice,
  prepaidMeter:prepaidMetersSlice,
  currentCustomer:currentCustomerSlice,
  apartmentPrepaidMeter:apartmentPrepaidMetersList,
  [authService.reducerPath]: authService.reducer,
  [cityService.reducerPath]: cityService.reducer,
  [myAccountService.reducerPath]:myAccountService.reducer,
  [prepaidMeterService.reducerPath]:prepaidMeterService.reducer,
  [maintainenceService.reducerPath]:maintainenceService.reducer,
  [expancesService.reducerPath]:expancesService.reducer,
  [profileService.reducerPath]:profileService.reducer,
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
      myAccountService.middleware,
      prepaidMeterService.middleware,
      maintainenceService.middleware,
      expancesService.middleware,
      profileService.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
