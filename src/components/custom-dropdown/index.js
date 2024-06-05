import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../common';

const CustomDropdown = ({showLabel, label, data, value, onChange, labelField, valueField,errorMessage }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleDropdownChange = item => {
    setSelectedValue(item[valueField]); 
    onChange(item[valueField], item[labelField]); 
  };
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{showLabel ? label : ''}</Text>
      <View style={styles.dropdown}>
        <Dropdown
          data={data && data.length > 0 ? data : [{ [labelField]: errorMessage || 'No results found', [valueField]: null }]}
          labelField={labelField}
          valueField={valueField}
          value={selectedValue}
          onChange={handleDropdownChange}
          search
          maxHeight={300}
          placeholder={`  Select ${label}`}
          searchPlaceholder="Search..."
          containerStyle={styles.dropdown}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    // marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: colors.black,
  },
  dropdown: {
    borderColor:colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
  },
});

export default CustomDropdown;
