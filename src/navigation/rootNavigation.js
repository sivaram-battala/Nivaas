
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
  AddPets,
  Maid,
  MaidProfile,
  PrepaidMeter,
  MaintainenceSettings,
  SocietyDues,
  AddPrepaidMeter,
  UserOnBoardingForm,
  FlatsOnboarding,
  EditOnboardedFlatDetails,
  Notification,
  AdminFlatSettings,
  Expences,
  AddNewExpances,
  CoAdmin,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationContext from '../utils/context-api/Context';
import {useAppSelector, useAppDispatch} from '../redux/reduxHooks';
import FrequentVisitor from '../screens/frequent-visitor';
import { AddVehicle } from '../screens/add-vechile';
import MainProfile from '../screens/maidprofile';
import Dailyhelp from '../screens/daily-help';
import EachService from '../screens/each-service';
import AdminSociety from '../screens/admin-society';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

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
      userOnBoardingForm,
      newApartmentOnBoard,
      myAccount,
      houseHold,
      orders,
      saearchFlatData,
      selectCityOptions,
      addPets,
      maid,
      frequentVisitor,
      dailyHelp,
      addVehicle,
      maidProfile,
      eachService,
      adminSociety,
      maintainenceSettings,
      prepaidMeter,
      addPrepaidMeter,
      societyDues,
      flatsOnboarding,
      editOnboardedFlatDetails,
      notification,
      adminFlatSettings,
      expences,
      addNewExpances,
      coAdmin,
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
          name={userOnBoardingForm}
          component={UserOnBoardingForm}
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
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
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
        <Stack.Screen
          name={dailyHelp}
          component={Dailyhelp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={maidProfile}
          component={MaidProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addVehicle}
          component={AddVehicle}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={eachService}
          component={EachService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={adminSociety}
          component={AdminSociety}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={prepaidMeter}
          component={PrepaidMeter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={maintainenceSettings}
          component={MaintainenceSettings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={societyDues}
          component={SocietyDues}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addPrepaidMeter}
          component={AddPrepaidMeter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={flatsOnboarding}
          component={FlatsOnboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={editOnboardedFlatDetails}
          component={EditOnboardedFlatDetails}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name={notification}
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={adminFlatSettings}
          component={AdminFlatSettings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={expences}
          component={Expences}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name={addNewExpances}
          component={AddNewExpances}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={coAdmin}
          component={CoAdmin}
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
        new Promise(resolve => setTimeout(resolve, 1000));
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
  const authState = useAppSelector(state => state.auth);

const getLoginDetails = () => {
  setLoginDetails(authState.token || null);
};

  useEffect(() => {
    getLoginDetails();
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
