import {ScrollView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './style';
import {SearchBar} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native';
import { allTexts, colors } from '../../common';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import { useLazyGetApartmentListQuery } from '../../redux/services/cityServices';
import { useDispatch, useSelector } from 'react-redux';
import { setapartmentData } from '../../redux/slices/apartmentsSlice';

const SearchCity = ({navigation,route}) => {
  const data = route?.params || {};
  // const cityData = useSelector(state=>state.cityData);
  // console.log(cityData,'rrrrrrrrrrrrrrrr');
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); 
  const [cities,setCities] = useState([]);
  const [apartmentsData, setapartmentsData] = useState()
  const [getApartmentsList] = useLazyGetApartmentListQuery();
  const dispatch = useDispatch();
  const getData =()=>{
    setCities(data?.data)
  }
  const handleSearch = text => {
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCities(filtered);
    setSearchText(text);
  };
  const handleClear = () => {
    setFilteredCities(cities);
    setSearchText('');
  };
  const handleCitySelect = city => {
    setCities(city.name);
    setSelectedCity(city.name);
    setSearchText(city);
    navigation.navigate(allTexts.screenNames.searchApartmentBlock,{selectedCity:city.name,apartmentsData:apartmentsData,cityData:data}); 
  };

  const getApartmentsData=()=>{
    let payload={
      cityId:15,
      pageNo:0,
      pageSize:50,
    }
    getApartmentsList(payload)
      .unwrap()
      .then((responce)=>{
        // console.log('apartments data===========>',responce?.data);
        setapartmentsData(responce?.data);
        dispatch(setapartmentData(responce?.data))
      }).catch((error)=>{
        console.log('error in apartments data========>',error);
      })
  }
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  useEffect(() => {
    getApartmentsData();
  }, [])
  
  return (
    <View style={styles.mainCon}>
      {/* <BlurView style={{ position: 'absolute', top: 110, bottom: 0, left: 25, right: 0 }} blurType="light" blurAmount={50} /> */}
      <SearchBar
        placeholder="Search Cities Here..."
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{ backgroundColor: colors.white, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
        searchIcon={{size: 24,color: colors.black}}
        clearIcon={{size: 24, onPress: handleClear}}
        inputStyle={{ color: colors.black }}
        inputContainerStyle={{ backgroundColor: colors.gray3, borderRadius: 30 }}
      />
      {filteredCities.length === 0 && searchText.length > 0 && (
        <Text style={styles.filteredDataText}>
          No cities found
        </Text>
      )}
      <FlatList
        data={filteredCities.length === 0 ? cities : filteredCities}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) =><View style={styles.filteredDataCon}>
             <TouchableOpacity onPress={() => handleCitySelect(item)}>
              <Text style={styles.filteredDataText}>{item.name}</Text>
             </TouchableOpacity>
        </View>}
      />
    </View>
  );
};

export default SearchCity;