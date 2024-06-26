import {Image, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Home from './Home';

const Tab = createBottomTabNavigator();

export default function LandingPage({navigation}: {navigation: any}) {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        options={{
          tabBarStyle: {
            backgroundColor: isDark ? '#121212' : 'white',
          },
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[{
                  color: focused ? '#80E618' : 'gray',
                  fontSize: 12,
                  fontWeight: '600',
                }]}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({focused}) => {
            let icon
            icon = focused ? require('./Assets/homeGreen.png') : require('./Assets/homeGray.png')
            return <Image style = {{height: 32, width: 32}} source={icon}></Image>;
          }
        }}
        name="Home"
        component={Home}></Tab.Screen>
      <Tab.Screen
        options={{
          tabBarStyle: {
            backgroundColor: isDark ? '#121212' : 'white',
          },
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? '#80E618' : 'gray',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Profile
              </Text>
            );
          },
          tabBarIcon: ({focused}) => {
            let icon
            icon = focused ? require('./Assets/profileGreen.png') : require('./Assets/profileGray.png')
            return <Image style = {{height: 32, width: 32}} source={icon}></Image>;
          }
        }}
        name="Profile"
        component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
}
