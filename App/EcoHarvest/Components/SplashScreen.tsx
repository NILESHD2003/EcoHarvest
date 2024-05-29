import {Image, useColorScheme} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({navigation}: {navigation: any}) {
  const isDark = useColorScheme() === 'dark';
  console.log(isDark)
  const checkLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigation.replace('Landing Page');
    } else {
      navigation.replace('Login Page');
    }
  };
  setTimeout(() => {
    checkLogin();
  }, 3000);
  return (
    <SafeAreaView style = {[{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}, isDark ? {backgroundColor: '#121212'} : null]}>
      <Image source={require('./Assets/splashImage.png')}></Image>
    </SafeAreaView>
  );
}
