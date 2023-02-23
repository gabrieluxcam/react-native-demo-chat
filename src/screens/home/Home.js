import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import ConversationItem from '../../components/ConversationItem';
import {getRandomInt, getRandomBool} from '../../helpers';
import {Divider} from 'react-native-paper';

function Home({navigation}) {
  const online = ['John Doe', 'Android'];

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const images = [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=entropy&cs=srgb&dl=adult-beard-boy-casual-220453.jpg&fit=crop&fm=jpg&h=959&w=640',
      'https://images.pexels.com/photos/3782179/pexels-photo-3782179.jpeg?crop=entropy&cs=srgb&dl=man-in-denim-jacket-is-smiling-3782179.jpg&fit=crop&fm=jpg&h=426&w=640',
      'https://images.pexels.com/photos/3876957/pexels-photo-3876957.jpeg?crop=entropy&cs=srgb&dl=woman-holding-red-ceramic-mug-3876957.jpg&fit=crop&fm=jpg&h=401&w=640',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?crop=entropy&cs=srgb&dl=women-s-white-and-black-button-up-collared-shirt-774909.jpg&fit=crop&fm=jpg&h=960&w=640',
    ];
    const names = [
      'John Doe',
      'Anonymous',
      'Foo Bar',
      'John Appleseed',
      'Android',
    ];
    const texts = [
      'How r u?',
      'Dinner at 8',
      'Will be late for meeting',
      'O Brother where art thou?',
    ];
    let tempConv = [];
    for (let i = 0; i < 15; i++) {
      tempConv.push({
        id: String(i),
        image: images[getRandomInt(4)],
        name: names[getRandomInt(5)],
        text: texts[getRandomInt(3)],
        time: '6:14',
        isRead: getRandomBool(),
      });
    }
    setConversations(tempConv);
  }, []); //Only runs once at component mount

  function _goToDetail(item) {
    navigation.navigate('ChatDetail', {
      id: item.id,
      name: item.name,
      image: item.image,
    });
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        data={conversations}
        renderItem={({item}) => {
          console.logI = 'should render';
          return (
            <ConversationItem
              onPress={() => _goToDetail(item)}
              item={item}
              isOnline={online.includes(item.name)}
            />
          );
        }}
        keyExtractor={item => item.id}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

export default Home;
