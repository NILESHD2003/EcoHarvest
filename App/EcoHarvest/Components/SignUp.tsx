import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Vibration,
  useColorScheme
} from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}: {navigation: any}) {
  const isDark = useColorScheme() === 'dark';
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loadingStyle, setLoadingStyle] = React.useState({});

  return (
    <ScrollView  contentContainerStyle = {{alignItems: 'center', gap: 90}} style={[signupStyles.signupContainer, isDark ? {backgroundColor: '#121212'} : null]} keyboardDismissMode='on-drag'>
      <View>
        <Text style={signupStyles.signupHeader}>Welcome To</Text>
        <Text style={[signupStyles.signupHeader, signupStyles.greenText]}>
          EcoHarvest
        </Text>
      </View>
      {
        loading ? (
          <View style = {signupStyles.loadingModal}><Text style={{fontSize: 20}}>Please Wait...</Text><Text style={{fontSize: 20}}>While we Register you</Text></View>
        ) : null
      }
      <View
        style={[signupStyles.signupForm, loadingStyle]}>
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
            Vibration.vibrate(1000);

            AsyncStorage.setItem('name', name);
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('password', password);
            AsyncStorage.setItem('confirmPassword', confirmPassword);

            setLoading(true);
            setLoadingStyle({opacity: 0});

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

            setLoading(false);
            setLoadingStyle({opacity: 1});

            const data = await response.json();

            console.log(data);

            const {success, message} = data;

            if (success) {
              navigation.navigate('OTP Page');
            } else {
              console.log(message)
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
    paddingTop: 120,
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
  loadingModal: {
    position: 'absolute',
    top: '40%',
    // left: '50%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 1,
    borderRadius: 10,
    borderBlockColor: 'black',  
    width: '80%',
    height: '40%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
