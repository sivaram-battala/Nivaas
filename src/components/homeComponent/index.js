import { Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from '../../screens/home-feed/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native';
import {PrimaryButton} from '../primary-button';
import {allTexts, colors} from '../../common';
import ImageSlider from '../image-slider';

const HomeComponent = ({
  currentCustomerData,
  navigation,
  isOneFlatOnboarded,
}) => {
  const [notificationsCount, setNotificationsCount] = useState(0)

  const GetNotificationsCount = async () => {
    getNotification()
    .unwrap()
    .then(response => {
      console.log('res of notifications', response);
      let Data = response?.customerRoles;
      let mapping = Data?.filter(item => item)?.map(({notifications}) => ({
        notifications,
      }));
      let FilteredData = mapping[0]?.notifications;
      if (FilteredData?.length > 1000) {
        setNotificationsCount('999+');
      }
      else if (FilteredData?.length > 100) {
        setNotificationsCount('99+')
      }
       else if (FilteredData?.length > 10) {
        setNotificationsCount('9+')
      }else {
        setNotificationsCount(FilteredData?.length);
      }
    })
    .catch(error => {
      console.log('error---> notfiaction', error);
      setLoader(false);
    });
  };
  useEffect(() => {
   GetNotificationsCount();
  }, [])
  
  return (
    <View>
      <View style={styles.headerCon}>
        <View style={styles.usernameCon}>
          <Text style={styles.username}>
            Hi, {currentCustomerData?.fullName}
          </Text>
        </View>
        <View style={styles.iconsCon}>
          <Ionicons
            name="notifications"
            size={28}
            style={styles.icons}
            onPress={() =>
              navigation.navigate(allTexts.screenNames.notification)
            }
          />
          {notificationsCount !== 0 && (
                  <>
                    <View style={styles.notificationsCount}>
                      <Text style={styles.notificationCountNumber}>
                        {notificationsCount}
                      </Text>
                    </View>
                  </>
          )}
           <MaterialIcons
              name="account-circle"
              size={30}
              style={styles.icons}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.myAccount, {
                  isOneFlatOnboarded: isOneFlatOnboarded,
                })
              }
            />
        </View>
      </View>
      <View style={styles.subConOne}>
        <Image
          source={require('../../utils/assets/images/peopleImg.png')}
          style={styles.image}
        />
        <Text style={styles.discoverMore}>
          {allTexts.headings.discoverMore}
        </Text>
        <Text style={styles.description}>
          {allTexts.paragraphs.discoverNivaas}
        </Text>
        <View style={{marginTop: '4%'}}>
          <PrimaryButton
            onPress={() =>
              navigation.navigate(allTexts.screenNames.selectCityOptions)
            }
            bgColor={colors.primaryColor}
            text={'+ ADD YOUR HOME'}
            shadow={true}
            textColor={colors.white}
          />
        </View>
      </View>
      {/* <View style={styles.subConTwo}>
        <Fontisto name="commenting" size={25} style={styles.commentIcon} />
        <View style={styles.textCon}>
          <Text style={styles.discoverMore}>
            {allTexts.paragraphs.accessAll}
          </Text>
          <Text style={styles.descriptionTwo}>
            {allTexts.paragraphs.itemPublished}
          </Text>
        </View>
      </View> */}
     <View style={styles.ImageSlideCon}>
        <ImageSlider />
     </View>
    </View>
  );
};

export default HomeComponent;
