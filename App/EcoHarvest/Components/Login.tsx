import {View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import React from 'react';

export default function Login() {

  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <View style = {loginStyles.loginContainer}>
      <View>
        <Text style = {loginStyles.loginHeader}>Welcome Back To</Text>
        <Text style = {[loginStyles.loginHeader, loginStyles.greenText]}>EcoHarvest</Text>
      </View>
      <View style = {loginStyles.loginForm}>
        <View style = {loginStyles.loginElements}>
          <TextInput  placeholder='Enter Email' style = {loginStyles.loginInputs} keyboardType='email-address'></TextInput>
        </View>
        <View style = {loginStyles.loginElements}>
          <TextInput  placeholder='Enter Password' style = {loginStyles.loginInputs} secureTextEntry = {true}></TextInput>
        </View>
        <Pressable style = {loginStyles.loginButton}><Text style = {{alignContent: 'center', fontWeight: '600',textAlign:'center', fontSize:20, color: 'white' }}>Login</Text></Pressable>
        <Text style = {{textAlign: 'center', fontSize: 18}}>Not an Existing User? <Text style = {loginStyles.greenText}>SignUp</Text></Text>
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
    alignItems: 'center'
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
  }
});
