import {ScrollView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {SearchBar} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native';
import { allTexts, colors } from '../../common';

const SearchCity = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); 
  const [cities,setCities] = useState( [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Houston' },
  ])
  // const cities = [
  //   { id: 1, name: 'New York' },
  //   { id: 2, name: 'Los Angeles' },
  //   { id: 3, name: 'Chicago' },
  //   { id: 4, name: 'Houston' },
  // ];

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
    setSelectedCity(city.name); 
    setSearchText(city);
    navigation.navigate(allTexts.screenNames.searchApartmentBlock,{selectedCity:city.name}); 
  };

  return (
    <View style={styles.mainCon}>
      {/* <BlurView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} blurType="light" blurAmount={10} /> */}
      <SearchBar
        placeholder="Search Cities Here..."
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{ backgroundColor: colors.white, borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
        searchIcon={{size: 24,color: colors.black}}
        clearIcon={{size: 24, onPress: handleClear}}
        inputStyle={{ color: colors.black }}
        inputContainerStyle={{ backgroundColor: colors.gray2, borderRadius: 10 }}
      />
      {filteredCities.length === 0 && searchText.length > 0 && (
        <Text style={styles.filteredDataText}>
          No cities found
        </Text>
      )}
      <FlatList
        data={searchText.length == 0 ? cities : filteredCities}
        keyExtractor={item => item.id.toString()}
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