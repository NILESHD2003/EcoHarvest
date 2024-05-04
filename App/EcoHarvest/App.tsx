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
import DeviceInfo from 'react-native-device-info';

const checkForUpdate = async (version: string) => {
  try {
    const url = 'https://ecoharvest.onrender.com/api/v1/application/check-update';
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
    const downloadUrl = 'https://ecoharvest.onrender.com/api/v1/application/get-app/specific/'+data.data.package_name;
    console.log(downloadUrl)
    if (updateAvailable) {
      Alert.alert(
        'Update Available',
        `An update is available for the app. Do you want to download and install it? \n\nWhat's New\n\n${data.data.desc}`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            // onPress: () => downloadAndInstallAPK(data.data.package_name, 'https://ecoharvest.onrender.com/api/v1/application/get-app/specific/EcoHarvest2.0.0'),
            onPress: () => downloadAndInstallAPK(data.data.package_name, downloadUrl),
          },
        ],
        {cancelable: false},
      );
    }
  } catch (e) {
    console.log('Error:-', e);
  }
};

const downloadAndInstallAPK = async (package_name : string, url2 : string) => {
  console.log(package_name)
  const url = 'https://ecoharvest.onrender.com/api/v1/application/get-app';
  console.log('Download URL:-', url2);
  const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/updateCurrNew.apk`;
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
  const version = DeviceInfo.getVersion();
  checkForUpdate(version);
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
