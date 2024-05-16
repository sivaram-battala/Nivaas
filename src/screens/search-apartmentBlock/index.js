import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native';
import {allTexts, colors} from '../../common';
import {styles} from './style';
import { BackHeaderNew } from '../../components';
import { useFocusEffect } from '@react-navigation/native';
import { useLazyGetFlatsListQuery } from '../../redux/services/cityServices';

const SearchApartmentBlock = ({navigation, route}) => {
  const data = route?.params;
  // console.log(data?.cityData,'kkkkkkkkkkkkkkkk');
  const [searchText, setSearchText] = useState('');
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setapartments] = useState();
  const [flatData, setflatData] = useState()
  const [getflatdata] = useLazyGetFlatsListQuery();

  const getData=()=>{
    setapartments(data?.apartmentsData);
    const payload = {
      flatId:29,
      pageNo:0,
      pageSize:100
    }
    getflatdata(payload).unwrap().then((responce)=>{
      // console.log(responce?.data,'rwwwwwwwwwww');
      setflatData(responce?.data);
    }).catch((error)=>{
      console.log('error in flat data==========>',error);
    })
  }
  const handleSearch = text => {
    const filtered = apartments.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredApartments(filtered);
    setSearchText(text);
  };
  const handleClear = () => {
    setFilteredApartments(apartments);
    setSearchText('');
  };
  const handleCitySelect = apartment => {
    setSelectedApartment(apartment.name);
    setSearchText(apartment);
    navigation.navigate(allTexts.screenNames.saearchFlatData,{selectedCity:data.selectedCity,selectedApartment:apartment?.name,flatData:flatData})
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View style={styles.mainCon}>
      {/* <BlurView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} blurType="light" blurAmount={10} /> */}
      <View style={{marginTop:10,marginLeft:9,flexDirection:'row', alignItems:'center'}}>
          <BackHeaderNew onPress={()=>navigation.goBack()} />
      </View>
      <Text style={{marginLeft:10, fontSize: 16, color: colors.orangeColor}}>
            {data.selectedCity}
      </Text>
      {/* {selectedApartment && (
        <View style={styles.topDetails}>
            <Text style={{fontSize: 16, color: colors.orangeColor}}>
              {selectedApartment}
            </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(allTexts.screenNames.userCityDetailsForm,{selectedCity:data.selectedCity,selectedApartment:selectedApartment})
            }>
            <Text
              style={styles.nextButton}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
      <SearchBar
        placeholder="Search apartments..."
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={styles.searchCon}
        searchIcon={{size: 24, color: 'black'}}
        clearIcon={{size: 24, onPress: handleClear}}
        inputStyle={{color: colors.black}}
        inputContainerStyle={{backgroundColor: colors.gray3, borderRadius: 30}}
      />
      {filteredApartments.length === 0 && searchText.length > 0 && (
       <View style={styles.suggestionCon}>
         <Text style={styles.filteredDataText}>No Apartments found</Text>
         <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.newApartmentOnBoard,{citydata:data?.cityData})}>
          <Text style={styles.onBoardText}>+ On Board</Text>
         </TouchableOpacity>
       </View>
      )}
      <FlatList
        data={filteredApartments.length === 0  ? apartments :filteredApartments}
        keyExtractor={item => item.id.toString()}
        vertical
        renderItem={({item}) => (
          <View style={styles.filteredDataCon}>
            <TouchableOpacity onPress={() => handleCitySelect(item)}>
              <Text style={styles.filteredDataText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SearchApartmentBlock;
