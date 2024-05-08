import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native';
import {allTexts, colors} from '../../common';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchApartmentBlock = ({navigation, route}) => {
  const selectedCitys = route?.params;
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setcities] = useState([
    {id: 1, name: 'block 1'},
    {id: 2, name: 'block 2'},
    {id: 3, name: 'block 3'},
    {id: 4, name: 'block 4'},
  ])
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
  };

  return (
    <View style={styles.mainCon}>
      {/* <BlurView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} blurType="light" blurAmount={10} /> */}
      <View style={{marginTop:10,marginLeft:9,flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.searchCity)}>
          <AntDesign name='arrowleft' size={25} color={colors.black}/>
        </TouchableOpacity>
      <Text style={{marginLeft:10, fontSize: 16, color: colors.orangeColor}}>
            {selectedCitys.selectedCity}
        </Text>
      </View>
      {selectedCity && (
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft:23
          }}>
          <View>
            <Text style={{fontSize: 16, color: colors.orangeColor}}>
              {selectedCity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(allTexts.screenNames.searchApartmentBlock)
            }>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.orangeColor,
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SearchBar
        placeholder="Search apartments..."
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{
          backgroundColor: colors.white,
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
        searchIcon={{size: 24, color: 'black'}}
        clearIcon={{size: 24, onPress: handleClear}}
        inputStyle={{color: colors.black}}
        inputContainerStyle={{backgroundColor: colors.gray2, borderRadius: 10}}
      />
      {filteredCities.length === 0 && searchText.length > 0 && (
       <View style={styles.suggestionCon}>
         <Text style={styles.filteredDataText}>No Apartments found</Text>
         <TouchableOpacity>
          <Text style={styles.onBoardText}>+ On Board</Text>
         </TouchableOpacity>
       </View>
      )}
      <FlatList
        data={filteredCities.length === 0  ? cities :filteredCities}
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
