/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import styles from './styles';
import {IconButton, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getRandomInt, showToast} from '../../helpers';
import {commonStyles} from '../commonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  hideSensitiveView,
  logEvent,
  logEventWithouProps,
} from '../../helpers/uxcamHelper';

export default function ContactDetail({navigation, route}) {
  const actions = [
    {
      icon: 'mail',
      name: 'Send message',
    },
    {
      icon: 'slash',
      name: 'Block user',
    },
    {
      icon: 'star',
      name: 'Mark as favourite',
    },
  ];

  function _listAction(index) {
    switch (index) {
      case 0:
        logEvent('navigation', {from: 'Contact detail'});
        route.params.onSendMessage({
          name: route.params.name,
          image: route.params.image,
        });
        navigation.goBack();
        break;
      case 1:
        logEventWithouProps('User blocked');
        showToast('User blocked');
        break;
      case 2:
        logEventWithouProps('User added to favourite');
        showToast('User added to favourite');
        break;
    }
  }

  function _addToContact() {
    navigation.goBack();
    showToast('Added to contact');
    logEvent('action', {type: 'add to contact'});
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.topContainer}>
        <IconButton
          icon="close"
          size={25}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: route.params.image}}
          style={commonStyles.profileImage}
        />
        <Text style={commonStyles.profileNameText}>{route.params.name}</Text>
        <Button
          style={{marginTop: 10}}
          theme={{roundness: 20}}
          icon="account-plus-outline"
          mode="contained"
          onPress={_addToContact}>
          Add to contact
        </Button>
      </View>
      <View style={[commonStyles.infoContainer, {marginTop: 40}]}>
        <Icon name="phone" size={20} color="gray" />
        <Text ref={hideSensitiveView} style={styles.infoText}>
          XXXXXXXXXXXXX
        </Text>
      </View>
      <View style={[commonStyles.infoContainer, {marginTop: 20}]}>
        <Icon name="mail" size={20} color="gray" />
        <Text ref={hideSensitiveView} style={styles.infoText}>
          user@userdomain.com
        </Text>
      </View>
      <FlatList
        style={{flex: 1, marginTop: 10}}
        data={actions}
        ListHeaderComponent={() => {
          return <Text style={commonStyles.headerText}>Options</Text>;
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => _listAction(index)}
              style={[commonStyles.infoContainer, {paddingVertical: 15}]}>
              <View>
                <Icon name={item.icon} color="gray" size={16} />
                <Text style={commonStyles.listText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={() => String(getRandomInt(1000))}
        ItemSeparatorComponent={() => <Divider />}
      />
    </SafeAreaView>
  );
}
