import {StyleSheet, Text, View, TextInput, Pressable, Vibration, useColorScheme} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleDigitChange = (
  text: string,
  nextRef?: React.RefObject<TextInput>,
) => {
  if (text.length === 1 && nextRef && nextRef.current) {
    nextRef.current.focus();
  }
};

export default function OTP({navigation}: {navigation: any}) {
  const isDark = useColorScheme() === 'dark';
  const [digit1, setDigit1] = React.useState('');
  const [digit2, setDigit2] = React.useState('');
  const [digit3, setDigit3] = React.useState('');
  const [digit4, setDigit4] = React.useState('');

  const digit1Ref = React.useRef<TextInput>(null);
  const digit2Ref = React.useRef<TextInput>(null);
  const digit3Ref = React.useRef<TextInput>(null);
  const digit4Ref = React.useRef<TextInput>(null);
  return (
    <View style={[otpStyles.container, isDark ? {backgroundColor: '#121212'} : null]}>
      <Text style={otpStyles.header}>Enter the code we just mailed you</Text>
      <View style={otpStyles.otpInput}>
        <TextInput
          onChangeText={text => setDigit1(text)}
          value={digit1}
          style={otpStyles.otpBox}
          ref={digit1Ref}
          maxLength={1}
          onKeyPress={({nativeEvent}) =>
            handleDigitChange(nativeEvent.key, digit2Ref)
          }></TextInput>
        <TextInput
          onChangeText={text => setDigit2(text)}
          value={digit2}
          style={otpStyles.otpBox}
          ref={digit2Ref}
          maxLength={1}
          onKeyPress={({nativeEvent}) =>
            handleDigitChange(nativeEvent.key, digit3Ref)
          }></TextInput>
        <TextInput
          onChangeText={text => setDigit3(text)}
          value={digit3}
          style={otpStyles.otpBox}
          ref={digit3Ref}
          maxLength={1}
          onKeyPress={({nativeEvent}) =>
            handleDigitChange(nativeEvent.key, digit4Ref)
          }></TextInput>
        <TextInput
          onChangeText={text => setDigit4(text)}
          value={digit4}
          style={otpStyles.otpBox}
          ref={digit4Ref}
          maxLength={1}
          onKeyPress={({nativeEvent}) =>
            handleDigitChange(nativeEvent.key)
          }></TextInput>
      </View>
      <Pressable
        onPress={async () => {
          Vibration.vibrate(1000);
          
          const otp = digit1 + digit2 + digit3 + digit4;
          console.log(otp);

          const name = await AsyncStorage.getItem('name');
          const email = await AsyncStorage.getItem('email');
          const password = await AsyncStorage.getItem('password');
          const confirmPassword = await AsyncStorage.getItem('confirmPassword');

          console.log(name, email, password, confirmPassword);

          try {
            const response = await fetch(
              'https://ecoharvest.onrender.com/api/v1/auth/signup',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: name,
                  email: email,
                  password: password,
                  confirmPassword: confirmPassword,
                  otp: otp,
                }),
              },
            );

            const data = await response.json();

            if (data.success) {
              navigation.navigate('Landing Page');
              AsyncStorage.setItem('isLoggedIn', 'true');
              AsyncStorage.removeItem('password');
              AsyncStorage.removeItem('confirmPassword');
            }
          } catch (e) {
            console.log(e);
          }
        }}
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
    flex: 1,
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
