import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactDetail from '../screens/contactDetail/ContactDetail';
import {LoggedInStack} from './loggedInStack';

const Stack = createStackNavigator();

export function MainModal() {
  return (
    <Stack.Navigator initialRouteName="Main" mode="modal">
      <Stack.Screen
        name="Main"
        component={LoggedInStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        initialParams={{name: '', image: ''}}
        options={{headerShown: false}}
        name="ContactModal"
        component={ContactDetail}
      />
    </Stack.Navigator>
  );
}
