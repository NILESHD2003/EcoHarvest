import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import OTP from './Components/OTP';
import LandingPage from './Components/LandingPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
