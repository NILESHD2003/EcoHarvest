import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './Components/SplashScreen';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import OTP from './Components/OTP';
import LandingPage from './Components/LandingPage';
import RNFetchBlob from 'rn-fetch-blob';

const checkForUpdate = async () => {
  try {
    const url = 'http://10.0.2.2:8000/api/v1/application/check-update';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '1.0.0',
        platform: 'android',
      }),
    });
    const data = await res.json();
    const {updateAvailable} = data;
    if (updateAvailable) {
      Alert.alert(
        'Update Available',
        'An update is available for the app. Do you want to download and install it?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => downloadAndInstallAPK(),
          },
        ],
        {cancelable: false},
      );
    }
  } catch (e) {
    console.log('Error:-', e);
  }
};

const downloadAndInstallAPK = async () => {
  const url = 'http://10.0.2.2:8000/api/v1/application/get-app';
  console.log('Download URL:-', url);
  const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/update.apk`;
  console.log('File Path:-', filePath);

  try {
    const res = await RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
      },
    }).fetch('GET', url);

    console.log(res);

    // Open the downloaded APK file
    RNFetchBlob.android.actionViewIntent(
      res.path(),
      'application/vnd.android.package-archive',
    );
  } catch (error) {
    console.error('Error while downloading and installing APK:', error);
  }
};

const Stack = createNativeStackNavigator();

const App = () => {
  checkForUpdate();
  // downloadAndInstallAPK();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={SplashScreen}
          name="Splash Page"></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={SignUp}
          name="SignUp Page"></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={Login}
          name="Login Page"></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={OTP}
          name="OTP Page"></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={LandingPage}
          name="Landing Page"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
