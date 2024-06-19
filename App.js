import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation, { navigationRef } from './src/navigation/rootNavigation';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native'
import { allTexts } from './src/common';
import { Notificationhandlers, requestUserPermission } from './src/utils/notification-utils/NotificationsUtils';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    Notificationhandlers();
    return () => {
      Notificationhandlers();
    };
  }, []);

  
  const checkToken = async () => {
    await messaging().requestPermission();
    const token = await messaging().getToken();
    // console.log('Device Token:', token);
  }
  checkToken();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={true}
          />
          <NavigationContainer ref={navigationRef}>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
