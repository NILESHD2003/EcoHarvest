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

export default function Profile({navigation}: {navigation: any}) {
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <View style={[{flex: 0.2}, profileStyles.headerBox]}>
        {/* <Image
          style={profileStyles.backLogo}
          source={require('./Assets/back-arrow.png')}></Image> */}
        <Text style={profileStyles.header}>Profile</Text>
      </View>
      <View style={{flex: 0.6}}>
        {/* Image goes here */}
        <View style = {profileStyles.profile}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 150,
              width: 150,
              borderRadius: 75,
            }}></View>
          <Text>Name</Text>
          <Text>Email</Text>
        </View>
        <Pressable
          onPress={() => {
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
          Version <Text style={[profileStyles.greenText]}>1.0.0</Text>
        </Text>
        {/* <Text style={[profileStyles.textCenter, profileStyles.text16]}>
          Developed by{' '}
          <Text style={[profileStyles.greenText]}>Nilesh Deshpande</Text>
        </Text> */}
        <Text style={[profileStyles.textCenter, profileStyles.text16]}>
          Project by{' '}
          <Text style={[profileStyles.greenText]}>Team INTELLECTS</Text>
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
  }
});
