import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';

const Stack = createStackNavigator();

export function LoggedOutStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
