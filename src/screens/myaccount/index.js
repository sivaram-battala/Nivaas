import { Text, View } from 'react-native'
import React from 'react'
import { styles } from './style'

const MyAccount = () => {
  return (
    <View style={{marginTop:20}}>
      <Text>MyAccount</Text>
    </View>
  )
}

export default MyAccount

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const data = [
//   { label: 'New York', value: '1' },
//   { label: 'Los Angeles', value: '2' },
//   { label: 'Chicago', value: '3' },
//   { label: 'Houston', value: '4' },
//   { label: 'Phoenix', value: '5' },
//   // Add more cities as needed
// ];

// const validationSchema = yup.object().shape({
//   city: yup.string().required('City is required'),
// });

// const MyAccount = () => {
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   return (
//     <Formik
//       initialValues={{
//         city: '',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log(values); // Handle form submission here
//       }}
//     >
//       {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//         <View style={styles.container}>
//           {/* <TextInput
//             style={styles.input}
//             onChangeText={handleChange('city')}
//             onBlur={handleBlur('city')}
//             value={values.city}
//             placeholder="Enter city"
//           />
//           {touched.city && errors.city && <Text style={styles.errorText}>{errors.city}</Text>} */}

//           <View style={styles.dropdownContainer}>
//             {/* <Text style={styles.label}>City</Text> */}
//             <Dropdown
//               style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//               placeholderStyle={styles.placeholderStyle}
//               selectedTextStyle={styles.selectedTextStyle}
//               inputSearchStyle={styles.inputSearchStyle}
//               iconStyle={styles.iconStyle}
//               data={data}
//               search
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={!isFocus ? 'Select city' : '...'}
//               searchPlaceholder="Search..."
//               value={value}
//               onFocus={() => setIsFocus(true)}
//               onBlur={() => setIsFocus(false)}
//               onChange={(item) => {
//                 setValue(item.value);
//                 handleChange('city')(item.label);
//                 setIsFocus(false);
//               }}
//               renderLeftIcon={() => (
//                 <AntDesign
//                   style={styles.icon}
//                   color={isFocus ? 'blue' : 'black'}
//                   name="Safety"
//                   size={20}
//                 />
//               )}
//             />
//           </View>

//           <Button onPress={handleSubmit} title="Submit" />
//         </View>
//       )}
//     </Formik>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 16,
//     marginTop:20
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     marginBottom: 10,
//   },
//   dropdownContainer: {
//     position: 'relative',
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default MyAccount;
