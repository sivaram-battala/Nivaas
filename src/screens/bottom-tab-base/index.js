/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, allTexts } from './../../common/index';
import {
 
  UserFeedScreen,
} from '..';
import { Loader } from '../../components';

import { styles } from './style';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export default BottomTabBase = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  return (
    <SafeAreaView
      keyboardHidesTabBar={true}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      {loader ? (
        <View style={{ flex: 1, marginTop: '3%' }}>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <Tab.Navigator
          backBehavior={'history'}
          screenOptions={{
            tabBarStyle: { innerHeight: '5%' },
          }}
          initialRouteName={
              allTexts.tabNames.home
          }
          tabBarOptions={{
            style: {
              height: '8%',
              flexDirection: 'row',
              alignSelf: 'center',
            },
            activeTintColor: colors.orangeColor,
            keyboardHidesTabBar: true,
            showLabel: false,
          }}>
          <Tab.Screen
            name={allTexts.tabNames.home}
            component={UserFeedScreen}
            options={{
              tabBarStyle: {
                height: 200,
              },
              tabBarIcon: ({ color, size, focused }) => (
                <View
                  style={
                    !focused
                      ? styles.container
                      : styles.UserFeedFocusedContainer
                  }>
                  {focused && (
                    <Entypo
                      name="dot-single"
                      size={20}
                      color={colors.orangeColor}
                      style={styles.dot}
                    />
                  )}
                  <Image
                    source={{uri:'https://media.istockphoto.com/id/1322575582/photo/exterior-view-of-modern-apartment-building-offering-luxury-rental-units-in-silicon-valley.jpg?s=612x612&w=0&k=20&c=7ipOB2nGt7JB-rln2YM1wxQ2NI4ZZirsxSn8Ko9pk-k='}}
                    style={focused ? styles.imageFocused : styles.imageNormal}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};