/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Contacts from '../screens/contacts/Contacts';
import Profile from '../screens/profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MyColors} from '../config/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';

const Stack = createStackNavigator();

const ConversationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Conversations" component={Home} />
    </Stack.Navigator>
  );
};

const ContactsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
        }}
        name="Contacts"
        component={Contacts}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({navigation}) => ({
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          title: '',
          headerRight: () => (
            <IconButton
              icon="square-edit-outline"
              onPress={() => navigation.navigate('EditProfile')}
            />
          ),
        })}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      tabBarOptions={{
        showLabel: true,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconName;

          if (route.name === 'Conversations') {
            iconName = 'ios-chatboxes';
          } else if (route.name === 'Contacts') {
            iconName = 'md-contacts';
          } else if (route.name === 'Profile') {
            iconName = 'ios-list-box';
          }

          const color = focused ? 'black' : MyColors.lightGray;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Conversations" component={ConversationStack} />
      <Tab.Screen name="Contacts" component={ContactsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
