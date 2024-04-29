import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import OTP from "./Components/OTP";

const App = () => {
  return(
    // <View style = {styles.container}>
    //   {/* <View><Text>Hello World</Text></View> */}
    //   {/* <Login></Login> */}
    //   {/* <SignUp></SignUp> */}
    //   <OTP></OTP>
    //   {/* <Footer></Footer> */}
    // </View>
    <SafeAreaView>
      {/* <Login></Login> */}
      {/* <SignUp></SignUp> */}
      <OTP></OTP>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default App;
