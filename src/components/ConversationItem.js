import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {Text} from 'react-native-paper';
import {MyColors} from '../config/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {hideSensitiveView} from '../helpers/uxcamHelper';

const ConversationItem = ({item, onPress, isOnline}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={onPress} style={styles.container}>
        <View style={styles.container}>
          <View>
            <Image style={styles.image} source={{uri: item.image}} />
            {isOnline && <View style={styles.online} />}
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <View style={[styles.textRow, {marginTop: 8}]}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.textRow}>
              <Text
                // ref={hideSensitiveView}
                numberOfLines={1}
                style={[
                  styles.message,
                  item.isRead ? {} : {fontWeight: 'bold'},
                ]}>
                {item.text}
              </Text>
              <Icon
                style={{flex: 2, textAlign: 'right'}}
                name={
                  // item.isRead ? 'check-all' : 'check'
                  'check-all'
                }
                size={15}
                color={MyColors.primaryColor}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// Props that can be used with this component. Not required but brings more clarity.
ConversationItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: MyColors.lightGray,
  },
  textRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    flex: 10,
  },
  name: {
    flex: 8,
    fontWeight: 'bold',
  },
  message: {
    flex: 8,
    color: 'gray',
  },
  time: {
    flex: 2,
    textAlign: 'right',
  },
  online: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    position: 'absolute',
    right: -4,
    top: -4,
  },
});

export default ConversationItem;
