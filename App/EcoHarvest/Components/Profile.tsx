import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

export default function Profile({navigation}: {navigation: any}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [appVersion, setAppVersion] = React.useState('1.0.0');
  const getData = async () => {
    try {
      const param1 = await AsyncStorage.getItem('name');
      const param2 = await AsyncStorage.getItem('email');
      const param3 = DeviceInfo.getVersion();
      setAppVersion(param3 || '1.0.0');
      setName(param1 || '');
      setEmail(param2 || '');
    } catch (e) {
      console.log(e);
    }
  };
  getData();
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <View style={[{flex: 0.2}, profileStyles.headerBox]}>
        <Text style={profileStyles.header}>Profile</Text>
      </View>
      <View style={{flex: 0.6}}>
        <View style={profileStyles.profile}>
          <Image source={require('./Assets/avatar.png')}></Image>
          <Text style={{color: 'black', fontSize: 20}}>{name}</Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginTop: -10,
              marginBottom: 40,
            }}>
            {email}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            AsyncStorage.setItem('isLoggedIn', 'false');
            navigation.navigate('Login Page');
          }}>
          <View
            style={{
              backgroundColor: 'red',
              height: 40,
              width: 200,
              marginRight: 'auto',
              marginLeft: 'auto',
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
                fontSize: 28,
              }}>
              Log Out
            </Text>
            <Image
              style={{height: 32, width: 32}}
              source={require('./Assets/logOutWhite.png')}></Image>
          </View>
        </Pressable>
      </View>
      <View style={[profileStyles.creditSection, {flex: 0.2}]}>
        <Text style={[profileStyles.textCenter, profileStyles.text16]}>
          Version <Text style={[profileStyles.greenText]}>{appVersion}</Text>
        </Text>
        <Text style={[profileStyles.textCenter, profileStyles.text16]}>
          Copyright 2024 &copy;{' '}
          <Text style={[profileStyles.greenText]}>Team INTELLECTS</Text>
        </Text>
        <Text style={[profileStyles.textCenter, profileStyles.text16]}>
          Developed by <Text style={[profileStyles.greenText]}>Nilesh</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const profileStyles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  creditSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenText: {
    color: '#80E618',
  },
  text16: {
    fontSize: 16,
  },
  headerBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  header: {
    fontSize: 36,
    color: 'grey',
  },
  backLogo: {
    height: 64,
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
