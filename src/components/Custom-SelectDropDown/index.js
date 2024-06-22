import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../../common';

const CustomSelectDropdown = ({ data, onSelect, selectedItem, placeholder }) => {
  return (
    <View style={styles.datePicker}>
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        defaultButtonText={placeholder}
        buttonTextAfterSelection={(selectedItem) => selectedItem?.name}
        rowTextForSelection={(item) => item?.name}
        defaultValue={selectedItem}
        renderButton={selectedItem => (
          <ScrollView style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.name) || placeholder}
            </Text>
          </ScrollView>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: colors.primaryRedColor }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item?.name}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 40,
    backgroundColor: colors.primaryRedColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonTxtStyle: {
    fontSize: 16,
    color: colors.white,
    fontWeight:'500'
  },
  dropdownItemStyle: {
    padding: 10,
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    color: colors.black,
  },
  dropdownMenuStyle: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default CustomSelectDropdown;
