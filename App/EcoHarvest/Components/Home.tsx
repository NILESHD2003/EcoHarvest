import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeatureContainer from './FeatureContainer';
import ImageInputPage from './ImageInputPage';
import FormInputPage from './FormInputPage';

const Stack2 = createNativeStackNavigator();

export default function Home({navigation}: {navigation: any}) {
  return (
    <NavigationContainer independent={true}>
      <Stack2.Navigator>
        <Stack2.Screen
          options={{
            headerShown: false,
          }}
          name="List Page"
          component={FeatureContainer}></Stack2.Screen>
        <Stack2.Screen
          options={{
            headerShown: false,
          }}
          name="Image Page"
          component={ImageInputPage}></Stack2.Screen>
        <Stack2.Screen
          options={{
            headerShown: false,
          }}
          name="Form Page"
          component={FormInputPage}></Stack2.Screen>
      </Stack2.Navigator>
    </NavigationContainer>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  greenText: {
    color: '#80E618',
  },
  pageHeader: {
    fontSize: 36,
    marginLeft: 18,
    marginTop: 18,
    marginBottom: 18,
    // textAlign: 'center',
  },
  carosuel: {
    height: 200,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureHeader: {
    fontSize: 24,
  },
  featureBox: {
    padding: 18,
    margin: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#80E618',
  },
  featureTitle: {
    fontSize: 20,
  },
  featureDesc: {
    fontSize: 12,
  },
  featureSection: {
    flex: 1,
    marginLeft: 18,
    marginTop: 18,
    marginRight: 18,
  },
});
