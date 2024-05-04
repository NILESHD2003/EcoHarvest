import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}: {navigation: any}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <ScrollView  contentContainerStyle = {{alignItems: 'center', gap: 90}} style={signupStyles.signupContainer} keyboardDismissMode='on-drag'>
      <View>
        <Text style={signupStyles.signupHeader}>Welcome To</Text>
        <Text style={[signupStyles.signupHeader, signupStyles.greenText]}>
          EcoHarvest
        </Text>
      </View>
      <View
        style={signupStyles.signupForm}>
        <Text
          style={[signupStyles.greenText, {fontSize: 28, fontWeight: '400'}]}>
          Register
        </Text>
        <View style={signupStyles.signupElements}>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Enter Name"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <View style={signupStyles.signupElements}>
          <TextInput
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
            placeholder="Enter Email"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <View style={signupStyles.signupElements}>
          <TextInput
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Enter Password"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <View style={signupStyles.signupElements}>
          <TextInput
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
            style={signupStyles.signupInputs}></TextInput>
        </View>
        <Pressable
          onPress={async () => {
            AsyncStorage.setItem('name', name);
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('password', password);
            AsyncStorage.setItem('confirmPassword', confirmPassword);

            const response = await fetch(
              'https://ecoharvest.onrender.com/api/v1/auth/send-otp',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                }),
              },
            );

            const data = await response.json();

            console.log(data);

            const {success, message} = data;

            if (success) {
              navigation.navigate('OTP Page');
            } else {
              Alert.alert(message);
            }
          }}
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
    </ScrollView>
  );
}

const signupStyles = StyleSheet.create({
  greenText: {
    color: '#80E618',
  },
  signupContainer: {
    // justifyContent: 'space-around',
    paddingTop: 120,
    // alignItems: 'center',
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
