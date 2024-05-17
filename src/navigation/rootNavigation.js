
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { LogBox } from 'react-native';
import { allTexts } from '../common';
import {
  SignUp,
  Signin,
  BottomTabBase,
  OTPScreen,
  AddDetails,
  SearchCity,
  SearchApartmentBlock,
  NewApartmentOnBoard,
  MyAccount,
  HouseHold,
  Orders,
  FlatData,
  SelectCityOptions,
  frequentVisitor,
  AddPets,
  Maid,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationContext from '../utils/context-api/Context';
import {useAppSelector, useAppDispatch} from '../redux/reduxHooks';
import UserCityDetailsForm from '../screens/city-details-form';
import FrequentVisitor from '../screens/frequent-visitor';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

const rootNavigation = () => {
  const {
    screenNames: {
      signin,
      otpScreen,
      signup,
      bottomTab,
      addDetails,
      searchCity,
      searchApartmentBlock,
      userCityDetailsForm,
      newApartmentOnBoard,
      myAccount,
      houseHold,
      orders,
      saearchFlatData,
      selectCityOptions,
      addPets,
      maid
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
        <Stack.Screen
          name={addDetails}
          component={AddDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={searchCity}
          component={SearchCity}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={searchApartmentBlock}
          component={SearchApartmentBlock}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={userCityDetailsForm}
          component={UserCityDetailsForm}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name={saearchFlatData}
          component={FlatData}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={newApartmentOnBoard}
          component={NewApartmentOnBoard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={myAccount}
          component={MyAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={houseHold}
          component={HouseHold}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={orders}
          component={Orders}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={selectCityOptions}
          component={SelectCityOptions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={frequentVisitor}
          component={FrequentVisitor}
          name={addPets}
          component={AddPets}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={maid}
          component={Maid}
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
        // <ApplicationContext.Provider
        //   value={{
        //     loginDetails,
        //     setLoginDetails,
        //     userDetails,
        //     setUserDetails,
        //   }}>
        //       {loginDetails === null || loginDetails === '' ? (
        //         <AuthStack />
        //       ) : (
        //         <HomeStack />
        //       )}
        // </ApplicationContext.Provider>
        <HomeStack />
  );
};

export default rootNavigation;
