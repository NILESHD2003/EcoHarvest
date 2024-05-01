import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

export default function SignUp({navigation}: {navigation: any}) {
  return (
    <View style={signupStyles.signupContainer}>
      <View>
        <Text style={signupStyles.signupHeader}>Welcome To</Text>
        <Text style={[signupStyles.signupHeader, signupStyles.greenText]}>
          EcoHarvest
        </Text>
      </View>
      <View style={signupStyles.signupForm}>
        <Text
          style={[signupStyles.greenText, {fontSize: 24, fontWeight: '600'}]}>
          Register
        </Text>
        <View style={signupStyles.signupElements}>
          <TextInput
            placeholder="Enter Name"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <View style={signupStyles.signupElements}>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter Email"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <View style={signupStyles.signupElements}>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter Password"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <View style={signupStyles.signupElements}>
          <TextInput
            secureTextEntry={true}
            placeholder="Confirm Password"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <Pressable
          onPress={() => navigation.navigate('OTP Page')}
          style={signupStyles.signupButton}>
          <Text
            style={{
              alignContent: 'center',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
            }}>
            Complete Signup
          </Text>
        </Pressable>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          Already an Existing User?{' '}
          <Text
            style={signupStyles.greenText}
            onPress={() => navigation.navigate('Login Page')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const signupStyles = StyleSheet.create({
  greenText: {
    color: '#80E618',
  },
  signupContainer: {
    // justifyContent: 'space-around',
    paddingTop: 120,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: 120,
  },
  signupHeader: {
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupForm: {
    display: 'flex',
    gap: 20,
  },
  signupElements: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signupInputs: {
    height: 40,
    width: 300,
    borderColor: '#80E618',
    borderBottomWidth: 1,
    borderRadius: 10,
    // textAlign: 'center',
  },
  signupButton: {
    marginTop: 20,
    backgroundColor: '#80E618',
    padding: 10,
    borderRadius: 25,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
