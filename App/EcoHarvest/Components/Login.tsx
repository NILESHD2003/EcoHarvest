import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Vibration
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}: {navigation: any}) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  return (
    <View style={loginStyles.loginContainer}>
      <View>
        <Text style={loginStyles.loginHeader}>Welcome Back</Text>
        <Text style={loginStyles.loginHeader}>To</Text>
        <Text style={[loginStyles.loginHeader, loginStyles.greenText]}>
          EcoHarvest
        </Text>
      </View>
      <View style={loginStyles.loginForm}>
        <View style={loginStyles.loginElements}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter Email"
            style={loginStyles.loginInputs}
            keyboardType="email-address"></TextInput>
        </View>
        <View style={loginStyles.loginElements}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Enter Password"
            style={loginStyles.loginInputs}
            secureTextEntry={true}></TextInput>
        </View>
        {
          showError ? (
            <Text style={{color: 'red', textAlign: 'center'}}>Invalid Credentials</Text>
          ) : null
        }
        <Pressable
          onPress={async() => {
            Vibration.vibrate(1000);

            console.log(email, password)
            const response = await fetch('https://ecoharvest.onrender.com/api/v1/auth/login', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });

            const data = await response.json();

            if (data.success) {
              setShowError(false);
              setTimeout(() => {},3000)
              console.log(data.user);
              const {name, email, token} = data.user;
              
              AsyncStorage.setItem('name', name);
              AsyncStorage.setItem('email', email);
              AsyncStorage.setItem('token', token);
              AsyncStorage.setItem('isLoggedIn', 'true');
              
              navigation.navigate('Landing Page');
            } else {
              setShowError(true);
            }
          }}
          style={loginStyles.loginButton}>
          <Text
            style={{
              alignContent: 'center',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
            }}>
            Login
          </Text>
        </Pressable>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          Not an Existing User?{' '}
          <Text
            style={loginStyles.greenText}
            onPress={() => navigation.navigate('SignUp Page')}>
            SignUp
          </Text>
        </Text>
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  greenText: {
    color: '#80E618',
  },
  loginContainer: {
    // justifyContent: 'space-around',
    paddingTop: 120,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: 120,
  },
  loginHeader: {
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginForm: {
    display: 'flex',
    gap: 20,
  },
  loginElements: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginInputs: {
    height: 40,
    width: 300,
    borderColor: '#80E618',
    borderWidth: 1,
    borderRadius: 10,
    // textAlign: 'center',
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#80E618',
    padding: 10,
    borderRadius: 25,
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
