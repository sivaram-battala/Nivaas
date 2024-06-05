import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/rootNavigation';
import { requestUserPermission } from './src/utils/notification-utils/NotificationsUtils';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);


  
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message handled:', remoteMessage);
  });
 
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
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
