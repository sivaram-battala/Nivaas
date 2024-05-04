import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import all reducers here
import authSlice from './slices/authSlice';
import homeFeedSlice from './slices/homeFeedSlice';
import { authService } from './services/authService';
// import { homeFeedService } from './services/homeFeedService';
import { notificationService } from './services/notificationService';
import { searchService, searchService2, searchService3 } from './services/searchService';
// import { templeProfileService, templeProfileService2, templeProfileService3, templeProfileService4, templeProfileService5 } from './services/templeProfileService';
import reelsFeedSlice from './slices/reelsFeedSlice';
// import { reelsFeedService } from './services/reelsFeedService';
// import { eventsFeedService } from './services/EventsFeedService';
import { favouriteService, getTempleDetailsWithIdService } from './services/favouritesInprofileService';
import { ProfileMembershipsDataService, adminTempleProfilesService, profileDonationsListService, savedPostsService } from './services/profileServices';
// import { donationSerivce, donationSerivce2, donationSerivce3 } from './services/donationSerivce';
import { feedService } from './services/feedService';
// import { memberShipService } from './services/memberShipService';
import { userProfileService, userProfileService2, userProfileService3, userProfileService4, userProfileService5 } from './services/userProfileService';
// import { storeService } from './services/storeService';

const rootReducers = combineReducers({
  auth: authSlice,
  homeFeed: homeFeedSlice,
  reelsFeed: reelsFeedSlice,
  [authService.reducerPath]: authService.reducer,
//   [homeFeedService.reducerPath]: homeFeedService.reducer,
  [notificationService.reducerPath]: notificationService.reducer,
  [searchService.reducerPath]: searchService.reducer,
  [searchService2.reducerPath]: searchService2.reducer,
  [searchService3.reducerPath]: searchService3.reducer,
//   [templeProfileService.reducerPath]: templeProfileService.reducer,
//   [templeProfileService2.reducerPath]: templeProfileService2.reducer,
//   [templeProfileService3.reducerPath]: templeProfileService3.reducer,
//   [templeProfileService4.reducerPath]: templeProfileService4.reducer,
//   [templeProfileService5.reducerPath]: templeProfileService5.reducer,
//   [reelsFeedService.reducerPath]: reelsFeedService.reducer,
//   [eventsFeedService.reducerPath] :eventsFeedService.reducer,
  [favouriteService.reducerPath] :favouriteService.reducer,
  [getTempleDetailsWithIdService.reducerPath] :getTempleDetailsWithIdService.reducer,
  [savedPostsService.reducerPath] :savedPostsService.reducer,
  [ProfileMembershipsDataService.reducerPath] :ProfileMembershipsDataService.reducer,
  [profileDonationsListService.reducerPath] :profileDonationsListService.reducer,
  [adminTempleProfilesService.reducerPath] :adminTempleProfilesService.reducer,
//   [donationSerivce.reducerPath] :donationSerivce.reducer,
//   [donationSerivce2.reducerPath] :donationSerivce2.reducer,
//   [donationSerivce3.reducerPath] :donationSerivce3.reducer,
  [feedService.reducerPath] :feedService.reducer,
//   [memberShipService.reducerPath] :memberShipService.reducer,
  [userProfileService.reducerPath] :userProfileService.reducer,
  [userProfileService2.reducerPath] :userProfileService2.reducer,
  [userProfileService3.reducerPath] :userProfileService3.reducer,
  [userProfileService4.reducerPath] :userProfileService4.reducer,
  [userProfileService5.reducerPath] :userProfileService5.reducer,
//   [storeService.reducerPath] : storeService.reducer,
  
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
    //   homeFeedService.middleware,
      notificationService.middleware,
      searchService.middleware,
      searchService2.middleware,
    //   templeProfileService.middleware,
    //   templeProfileService2.middleware,
    //   templeProfileService3.middleware,
    //   templeProfileService4.middleware,
    //   templeProfileService5.middleware,
    //   reelsFeedService.middleware,
    //   eventsFeedService.middleware,
      favouriteService.middleware,
      getTempleDetailsWithIdService.middleware,
      savedPostsService.middleware,
      ProfileMembershipsDataService.middleware,
      profileDonationsListService.middleware,
      adminTempleProfilesService.middleware,
    //   donationSerivce.middleware,
    //   donationSerivce2.middleware,
    //   donationSerivce3.middleware,
      feedService.middleware,
    //   memberShipService.middleware,
      userProfileService.middleware,
      userProfileService2.middleware,
      userProfileService3.middleware,
      userProfileService4.middleware,
      userProfileService5.middleware,
      searchService3.middleware,
    //   storeService.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
