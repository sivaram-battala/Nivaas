import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../common';
import { statusBarHeight } from '../../utils/config/config';
import { NotificationCard, TopBarCard2 } from '../../components';
import Feather from 'react-native-vector-icons/Feather';

const Notification = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: '1', title: 'Notification 1', message: 'This is the first notification.' },
    { id: '2', title: 'Notification 2', message: 'This is the second notification.' },
  ];

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <NotificationCard title={item.title} message={item.message} />
  );

  return (
    <View style={styles.mainCon}>
      {!searchVisible && (
        <View style={styles.topBar}>
          <TopBarCard2 back={true} navigation={navigation} txt={'Notifications'} />
          <TouchableOpacity style={styles.icon} onPress={() => setSearchVisible(true)}>
            <Feather name='search' size={25} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
      {searchVisible && (
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => { setSearchVisible(false); setSearchQuery(''); }}>
            <Feather name='arrow-left' size={25} color={colors.black} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name='x' size={25} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  topBar: {
    height: 70,
    marginTop: statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    right: '3%',
    bottom: '25%',
  },
  searchBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
    marginTop: statusBarHeight,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
    color: colors.black,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
