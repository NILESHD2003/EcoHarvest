import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React from 'react';

export default function OTP({navigation}: {navigation: any}) {
  return (
    <View style={otpStyles.container}>
      <Text style={otpStyles.header}>Enter the code we just mailed you at</Text>
      <View style={otpStyles.otpInput}>
        <TextInput style={otpStyles.otpBox}></TextInput>
        <TextInput style={otpStyles.otpBox}></TextInput>
        <TextInput style={otpStyles.otpBox}></TextInput>
        <TextInput style={otpStyles.otpBox}></TextInput>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Landing Page')}
        style={otpStyles.verifyOtp}>
        <Text
          style={{
            fontSize: 24,
            color: 'white',
            textAlign: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}>
          Verify
        </Text>
      </Pressable>
      <Text style={{fontSize: 20}}>
        Didn't Receive the mail? <Text style={{color: 'blue'}}>Resend</Text>
      </Text>
      <Text
        style={{fontSize: 20, color: 'red'}}
        onPress={() => navigation.goBack()}>
        Cancel
      </Text>
    </View>
  );
}

const otpStyles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  otpBox: {
    height: 60,
    width: 60,
    borderColor: '#80E618',
    borderWidth: 2,
    opacity: 0.5,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 20,
  },
  otpInput: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyOtp: {
    backgroundColor: '#80E618',
    width: 200,
    height: 60,
    // padding: 20,
    borderRadius: 20,
  },
});
