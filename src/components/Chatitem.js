import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {MyColors, FontSize} from '../config/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const CHAT_ITEM_IMAGE_SIZE = 40;
const width = Dimensions.get('window').width;

const ChatItem = ({item, myID, image, isLast}) => {
  const isMy = myID === item.userID;

  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <View style={isMy ? styles.reverseContainer : styles.container}>
        {!isMy && <Image style={styles.image} source={{uri: image}} />}
        <View style={isMy ? styles.myMessageWrapper : styles.otherMsgWrapper}>
          <View style={{flex: 1}} />
          <Text style={{color: isMy ? 'white' : 'black'}}>{item.text}</Text>
        </View>
      </View>
      <View style={isMy ? styles.myTimeContainer : styles.otherTimeContainer}>
        {isMy && <View style={{flex: 1}} />}
        <Text style={styles.timeText}>{item.time}</Text>
        {isLast && (
          <Icon
            name={item.sent && item.isRead ? 'check-all' : 'check'}
            size={15}
            style={{marginBottom: 10}}
            color={item.sent ? MyColors.primaryColor : 'gray'}
          />
        )}
      </View>
    </View>
  );
};

ChatItem.propTypes = {
  item: PropTypes.object.isRequired,
  myID: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  reverseContainer: {
    flexDirection: 'row-reverse',
  },
  image: {
    height: CHAT_ITEM_IMAGE_SIZE,
    width: CHAT_ITEM_IMAGE_SIZE,
    borderRadius: 10,
    backgroundColor: MyColors.lightGray,
  },
  otherTimeContainer: {
    flexDirection: 'row',
    marginLeft: 50,
    marginTop: 2,
  },
  myTimeContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  otherMsgWrapper: {
    backgroundColor: '#ECECEC',
    minHeight: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginLeft: 10,
    maxWidth: width - 100,
    borderBottomLeftRadius: 0,
  },
  myMessageWrapper: {
    backgroundColor: MyColors.primaryColor,
    minHeight: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    maxWidth: width - 100,
  },
  timeText: {
    fontSize: FontSize.small,
    marginRight: 5,
    color: 'gray',
  },
});

export default ChatItem;
