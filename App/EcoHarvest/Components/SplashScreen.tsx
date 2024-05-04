import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({navigation}: {navigation: any}) {
  const checkLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigation.navigate('Landing Page');
    } else {
      navigation.navigate('Login Page');
    }
  };
  setTimeout(() => {
    checkLogin();
  }, 3000);
  return (
    <SafeAreaView style = {{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('./Assets/splashImage.png')}></Image>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
