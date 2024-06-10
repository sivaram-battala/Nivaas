import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFcmToken(); 
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log(fcmToken, 'Existing FCM Token');
    if (!fcmToken) {
      fcmToken = await messaging().getToken(); 
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
        console.log('New FCM Token:', fcmToken);
      } else {
        console.log('Failed to get FCM Token');
      }
    }
  } catch (error) {
    console.error('Error getting FCM Token:', error);
  }
};