import { Text, View} from 'react-native';
import React from 'react';
import {styles} from '../../screens/home-feed/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Image} from 'react-native';
import {PrimaryButton} from '../primary-button';
import {allTexts, colors} from '../../common';
import ImageSlider from '../image-slider';

const HomeComponent = ({
  currentCustomerData,
  navigation,
  isOneFlatOnboarded,
}) => {
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
