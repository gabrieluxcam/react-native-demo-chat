import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTab} from './tab';
import ChatDetail from '../screens/chatDetail/ChatDetail';
import EditProfile from '../screens/editProfile/EditProfile';
import PrivacyPolicy from '../screens/webView/PrivacyPolicy';
import PrivateMessage from '../screens/privateMessage/PrivateMessage';
import Crasher from '../screens/crasher/Crasher';

const Stack = createStackNavigator();

export function LoggedInStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerTintColor: 'black'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeTab}
      />

      <Stack.Screen
        options={({route}) => ({
          headerBackTitleVisible: false,
          title: route.params.name,
        })}
        name="ChatDetail"
        initialParams={{id: '0', name: '', image: ''}}
        component={ChatDetail}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          title: 'Edit profile',
        }}
        name="EditProfile"
        component={EditProfile}
      />

      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: 'Privacy policy',
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />

      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: 'Private conversations',
        }}
        name="PrivateMessage"
        component={PrivateMessage}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: 'Crasher',
        }}
        name="Crasher"
        component={Crasher}
      />
    </Stack.Navigator>
  );
}
