/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {Searchbar, Divider} from 'react-native-paper';
import ContactItem from '../../components/ContactItem';
import {getRandomInt} from '../../helpers';

function Contacts({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [contactList, setContactList] = useState([]);

  const onlineIDs = [1, 4, 6, 8, 9, 15]; //currently online user ids
  const images = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=entropy&cs=srgb&dl=adult-beard-boy-casual-220453.jpg&fit=crop&fm=jpg&h=959&w=640',
    'https://images.pexels.com/photos/3782179/pexels-photo-3782179.jpeg?crop=entropy&cs=srgb&dl=man-in-denim-jacket-is-smiling-3782179.jpg&fit=crop&fm=jpg&h=426&w=640',
    'https://images.pexels.com/photos/3876957/pexels-photo-3876957.jpeg?crop=entropy&cs=srgb&dl=woman-holding-red-ceramic-mug-3876957.jpg&fit=crop&fm=jpg&h=401&w=640',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?crop=entropy&cs=srgb&dl=women-s-white-and-black-button-up-collared-shirt-774909.jpg&fit=crop&fm=jpg&h=960&w=640',
  ];

  useEffect(() => {
    //load contact json from external file
    this.userList = require('../../assets/contacts.json');
    setContactList(require('../../assets/contacts.json'));
  }, []); //Only runs once at component mount

  function _search(query) {
    setSearchText(query);
    //filter list for search query
    const filter = this.userList.filter(obj => {
      // TODO check this
      if (obj.name.toLowerCase().includes(query.toLowerCase())) {
        return obj;
      }
    });
    setContactList(filter);
  }

  function onSendMessage(userInfo) {
    setTimeout(() => navigation.navigate('ChatDetail', {...userInfo}), 500);
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Searchbar
        style={{
          marginHorizontal: 20,
          backgroundColor: '#DCDCDC',
          borderRadius: 20,
        }}
        placeholder="Search user..."
        onChangeText={query => _search(query)}
        value={searchText}
      />
      <FlatList
        data={contactList}
        style={{marginTop: 5}}
        renderItem={({item}) => {
          return (
            <ContactItem
              item={item}
              image={images[getRandomInt(4)]}
              isOnline={onlineIDs.includes(item.id)}
              onPress={() =>
                navigation.navigate('ContactModal', {
                  name: item.name,
                  image: images[getRandomInt(4)],
                  onSendMessage: userInfo => onSendMessage(userInfo),
                })
              }
            />
          );
        }}
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

export default Contacts;
