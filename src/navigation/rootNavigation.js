
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { LogBox } from 'react-native';
import { allTexts } from '../common';
import {
  SignUp,
  Signin,
  BottomTabBase,
  OTPScreen,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationContext from '../utils/context-api/Context';
import {useAppSelector, useAppDispatch} from '../redux/reduxHooks';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

const rootNavigation = () => {
  const {
    screenNames: {
      signin,
      otpScreen,
      signup,
      bottomTab,
    },
  } = allTexts;

  const dispatch = useAppDispatch();

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={signin}
          component={Signin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={signup}
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={otpScreen}
          component={OTPScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName={bottomTab}>
        <Stack.Screen
          name={bottomTab}
          component={BottomTabBase}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  useEffect(() => {
    async function prepare() {
      try {
        new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  const Stack = createStackNavigator();
  const [loginDetails, setLoginDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});

//Redux hooks
const authState = useAppSelector(state => state.auth);

const getLoginDetails = () => {
  setLoginDetails(authState.token || null);
};

  useEffect(() => {
    // Auth();
    getLoginDetails();
    // reelsData(0,30)
  }, []);
  
  return (
        <ApplicationContext.Provider
          value={{
            loginDetails,
            setLoginDetails,
            userDetails,
            setUserDetails,
          }}>
              {loginDetails === null || loginDetails === '' ? (
                <AuthStack />
              ) : (
                <HomeStack />
              )}
        </ApplicationContext.Provider>
  );
};

export default rootNavigation;
