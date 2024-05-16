/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, allTexts } from './../../common/index';
import {
  BuyAndSell,
  Community,
  Home,
  Homes,
  Services,
} from '..';
import { Loader } from '../../components';

import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'

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
            component={Home}
            options={{
              tabBarStyle: {
                height: 80,
              },
              headerShown: false,
              
              tabBarIcon: ({ color, size, focused }) => (
                <View
                  style={styles.iconTextCon}>  
                  <AntDesign name='home' size={30} style={focused ? styles.imageFocused : styles.imageNormal}/>
                  <Text style={focused ? styles.textFocused : styles.textNormal}>{allTexts.tabNames.home}</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.community}
            component={Community}
            options={{
              tabBarStyle: {
                height: 80,
              },
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <View style={styles.iconTextCon}>  
                  <MaterialIcons name='apartment' size={30} style={focused ? styles.imageFocused : styles.imageNormal}/>
                  <Text style={focused ? styles.textFocused : styles.textNormal}>{allTexts.tabNames.community}</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
           name={allTexts.tabNames.homes}
            component={Homes}
            options={{
              tabBarStyle: {
                height: 80,
              },
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <View
                  style={styles.iconTextCon}>  
                  <MaterialCommunityIcons name='home-search' size={30} style={focused ? styles.imageFocused : styles.imageNormal}/>
                  <Text style={focused ? styles.textFocused : styles.textNormal}>{allTexts.tabNames.homes}</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
           name={allTexts.tabNames.buyAndSell}
            component={BuyAndSell}
            options={{
              tabBarStyle: {
                height: 80,
              },
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <View
                  style={styles.iconTextCon}>  
                  <FontAwesome name='handshake-o' size={30} style={focused ? styles.imageFocused : styles.imageNormal}/>
                  <Text style={focused ? styles.textFocused : styles.textNormal}>{allTexts.tabNames.buyAndSell}</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
           name={allTexts.tabNames.services}
            component={Services}
            options={{
              tabBarStyle: {
                height: 80,
              },
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <View
                  style={styles.iconTextCon}>  
                  <Ionicons name='settings-outline' size={30} style={focused ? styles.imageFocused : styles.imageNormal}/>
                  <Text style={focused ? styles.textFocused : styles.textNormal}>{allTexts.tabNames.services}</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};