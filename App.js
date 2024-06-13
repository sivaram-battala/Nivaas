import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation, { navigationRef } from './src/navigation/rootNavigation';
import { requestUserPermission } from './src/utils/notification-utils/NotificationsUtils';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native'
import { allTexts } from './src/common';

const App = () => {
  // useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     onDisplayNotification(remoteMessage);
  //   });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('mesage handles in background', remoteMessage);
  //   })
  //   return unsubscribe;
  // }, []);

  // async function onDisplayNotification(data) {
  //   console.log('-----------------------------------', data?.notification)
  //   await notifee.requestPermission()
 
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });
 
  //   await notifee.displayNotification({
  //     title: data?.notification?.title,
  //     body: data?.notification?.body,
  //     android: {
  //       channelId,
  //       // smallIcon: 'ic_notification_icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }




  useEffect(() => {
    requestUserPermission();

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background', remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    const unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
      handleNotificationNavigation(remoteMessage);
    });

    const unsubscribeInitialNotification = messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        handleNotificationNavigation(remoteMessage);
      }
    });

    // Notifee event listener for when the app is in foreground/background
    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('User pressed the notification.', detail.notification);
        handleNotificationNavigation(detail.notification.data);
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeNotificationOpenedApp();
      unsubscribeNotifee();
    };
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status of FCM TOKEN:', authStatus);
    }
  }

  async function onDisplayNotification(data) {
    console.log('-----------------------------------', data?.notification);
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: data?.notification?.title,
      body: data?.notification?.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      data: data.data, // Ensure that data is passed to the notification
    });
  }

  function handleNotificationNavigation(data) {
    console.log(data);
    if (data && data.screen) {
      navigationRef.current?.navigate(allTexts.screenNames.notification, data.params);
    }
  }

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Background message handled:', remoteMessage);
  //   onDisplayNotification(remoteMessage);
  // });
 
  const checkToken = async () => {
    await messaging().requestPermission();
    const token = await messaging().getToken();
    console.log('Device Token:', token);
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
