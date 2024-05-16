import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../common';

const CustomDropdown = ({ label, data, value, onChange, labelField, valueField }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleDropdownChange = item => {
    setSelectedValue(item[valueField]); 
    onChange(item[valueField], item[labelField]); 
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdown}>
        <Dropdown
          data={data}
          labelField={labelField}
          valueField={valueField}
          value={selectedValue}
          onChange={handleDropdownChange}
          search
          maxHeight={300}
          placeholder={`Select ${label.toLowerCase()}`}
          searchPlaceholder="Search..."
          containerStyle={styles.dropdown}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: colors.black,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
  },
});

export default CustomDropdown;
