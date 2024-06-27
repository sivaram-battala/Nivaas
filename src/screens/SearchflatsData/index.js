import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useCallback, useState} from 'react';
  import {SearchBar} from 'react-native-elements';
  import {FlatList} from 'react-native';
  import {allTexts, colors} from '../../common';
  import { BackHeaderNew } from '../../components';
  import { useFocusEffect } from '@react-navigation/native';
  import { styles } from './style';
  
  const FlatData = ({navigation,route}) => {
    const data = route?.params;
    // console.log(data,'kkkkkkkkkkkkkkkk');
    const [searchText, setSearchText] = useState('');
    const [filteredflats, setFilteredflats] = useState([]);
    const [selectedFlat, setSelectedFlat] = useState(null);
    const [flats, setflats] = useState();
  
    const getData=()=>{
      setflats(data?.flatData)
    }
    const handleSearch = text => {
      const filtered = flats.filter(city =>
        city.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredflats(filtered);
      setSearchText(text);
    };
    const handleClear = () => {
      setFilteredflats(flats);
      setSearchText('');
    };
    const handleCitySelect = flatData => {
      setSelectedFlat(flatData.flatNo);
      setSearchText(flatData);
      navigation.navigate(allTexts.screenNames.userCityDetailsForm,{selectedCity:data.selectedCity,selectedApartment:data?.selectedApartment,flatData:flatData?.flatNo,flatId:flatData?.id})
    };
  
    useFocusEffect(
      useCallback(() => {
        getData();
      }, []),
    );
  
    return (
      <View style={styles.mainCon}>
        <View style={{marginTop:10,marginLeft:9,flexDirection:'row', alignItems:'center'}}>
            <BackHeaderNew onPress={()=>navigation.goBack()} />
        </View>
        <Text style={{marginLeft:10, fontSize: 16, color: colors.primaryColor}}>
              {data.selectedCity}
        </Text>
        <Text style={{marginLeft:10, fontSize: 16, color: colors.primaryColor}}>
              {data.selectedApartment}
        </Text>
        <SearchBar
          placeholder="Search flats..."
          onChangeText={handleSearch}
          value={searchText}
          containerStyle={styles.searchCon}
          searchIcon={{size: 24, color: 'black'}}
          clearIcon={{size: 24, onPress: handleClear}}
          inputStyle={{color: colors.black}}
          inputContainerStyle={{backgroundColor: colors.gray3, borderRadius: 30}}
        />
        {filteredflats.length === 0 && searchText.length > 0 && (
         <View style={styles.suggestionCon}>
           <Text style={styles.filteredDataText}>No flats found</Text>
           <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.newApartmentOnBoard,{citydata:data?.cityData})}>
            <Text style={styles.onBoardText}>+ On Board</Text>
           </TouchableOpacity>
         </View>
        )}
        <FlatList
          data={filteredflats.length === 0  ? flats :filteredflats}
          keyExtractor={item => item.id.toString()}
          vertical
          renderItem={({item}) => (
            <View style={styles.filteredDataCon}>
              <TouchableOpacity onPress={() => handleCitySelect(item)}>
                <Text style={styles.filteredDataText}>{item.flatNo}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };
  
  export default FlatData;
  