/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import styles from './styles';
import {commonStyles} from '../commonStyles';
import {IconButton, TextInput, Text} from 'react-native-paper';
import {MyColors, FontSize} from '../../config/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {logEvent} from '../../helpers/uxcamHelper';

export default function EditProfile({navigation}) {
  // Set header right button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            logEvent('action', {type: 'save profile'});
            _save();
          }}>
          <Text
            style={{
              marginRight: 20,
              fontSize: FontSize.medium,
              fontWeight: '600',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  function _save() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, marginHorizontal: 20}}>
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=entropy&cs=srgb&dl=adult-beard-boy-casual-220453.jpg&fit=crop&fm=jpg&h=959&w=640',
              }}
              style={commonStyles.profileImage}
            />
            <IconButton
              style={styles.camIcon}
              icon="camera"
              color="white"
              size={16}
              onPress={() => console.log('Pressed')}
            />
          </View>
          <TextInput
            autoCapitalize="none"
            theme={{
              roundness: 10,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            style={[commonStyles.textInput, {backgroundColor: 'white'}]}
            label="Username"
          />
          <TextInput
            autoCapitalize="none"
            theme={{
              roundness: 10,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            style={[commonStyles.textInput, {backgroundColor: 'white'}]}
            label="Full name"
          />
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            theme={{
              roundness: 10,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            style={[commonStyles.textInput, {backgroundColor: 'white'}]}
            label="Email"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
