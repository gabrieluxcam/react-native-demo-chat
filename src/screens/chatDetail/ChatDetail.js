import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, SafeAreaView, Keyboard, Platform} from 'react-native';
import styles from './styles';
import ChatItem from '../../components/Chatitem';
import {TextInput, IconButton} from 'react-native-paper';
import {MyColors} from '../../config/theme';
import {logEvent} from '../../helpers/uxcamHelper';

export default function ChatDetail({route}) {
  const myID = 1;

  const [conversation, setConversation] = useState([]);
  const [myText, setMyText] = useState('');
  const [bottomMargin, setBottomMargin] = useState(0);
  const flatListRef = useRef(null);

  const [totalMsgSent, setTotalMsgSent] = useState(0);

  useEffect(() => {
    setConversation([
      {
        id: 0,
        userID: 0,
        text: 'Hello',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 1,
        userID: 1,
        text: 'Hi!',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 2,
        userID: 0,
        text: 'Whats up!',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 3,
        userID: 0,
        text: 'Did you hear about new COVID case?',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 4,
        userID: 1,
        text: 'Yes I did',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 5,
        userID: 0,
        text: 'Which one?',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 6,
        userID: 1,
        text: 'The new one of course',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 7,
        userID: 1,
        text: 'False new anyway, no need to worry',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 8,
        userID: 0,
        text: 'Who knows',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 9,
        userID: 1,
        text: 'Preety sure it is false',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
      {
        id: 10,
        userID: 0,
        text: 'Hmmm...',
        time: '10:22 PM',
        sent: true,
        isRead: true,
      },
    ]);
  }, []);

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
    //clear listener on component unmount
    return () => {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
      logEvent('Chat ended', {
        totalMsgSent: totalMsgSent + '',
      });
    };
  }, [totalMsgSent]);

  function _keyboardDidShow(e) {
    if (Platform.OS === 'ios') {
      setBottomMargin(e.endCoordinates.height);
    }
  }

  function _keyboardDidHide() {
    setBottomMargin(0);
  }

  function _send() {
    if (myText.trim() === '') {
      return;
    }
    Keyboard.dismiss();
    const arr = {
      id: Math.random() * (200 - 11) + 11,
      userID: 1,
      text: myText,
      time: new Date().toLocaleTimeString(),
      sent: true,
      isRead: false,
    };
    setConversation([...conversation, ...[arr]]);

    setMyText('');
    flatListRef.current.scrollToEnd({animated: true});
    setTotalMsgSent(totalMsgSent + 1);
  }

  return (
    <SafeAreaView
      forceInset={{top: 'never'}}
      style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        ref={flatListRef}
        style={{flex: 1}}
        data={conversation}
        renderItem={({item, index}) => {
          return (
            <ChatItem
              item={item}
              myID={myID}
              image={route.params.image}
              isLast={conversation.length - 1 === index}
            />
          );
        }}
        keyExtractor={item => String(item.id)}
      />
      <View style={[styles.inputContainer, {marginBottom: bottomMargin}]}>
        <IconButton
          color={MyColors.primaryColor}
          icon="image"
          size={22}
          disabled={true}
          onPress={() => console.log('open gallery')}
        />
        <TextInput
          autoCapitalize="none"
          theme={{
            roundness: 20,
            colors: {
              placeholder: MyColors.lightGray,
              backdrop: 'green',
            },
          }}
          mode="outlined"
          selectionColor={MyColors.defaultBackground}
          style={styles.input}
          placeholder="Your message..."
          value={myText}
          onChangeText={text => setMyText(text)}
        />
        <IconButton
          color={MyColors.primaryColor}
          icon="send"
          size={22}
          onPress={_send}
        />
        <IconButton
          color={MyColors.primaryColor}
          icon="thumb-up"
          size={22}
          disabled={true}
          onPress={() => console.log('like')}
        />
      </View>
    </SafeAreaView>
  );
}
