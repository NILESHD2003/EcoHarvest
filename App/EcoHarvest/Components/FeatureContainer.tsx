import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

export default function FeatureContainer({navigation}: {navigation: any}) {
  return (
    <SafeAreaView style={homeStyles.container}>
      <View>
        <Text style={[homeStyles.greenText, homeStyles.pageHeader]}>
          EcoHarvest
        </Text>
      </View>
      <View style={homeStyles.carosuel}>
        <Text>Here goes images carosuel</Text>
      </View>
      <View style={homeStyles.featureSection}>
        <Text style={homeStyles.featureHeader}>
          Our <Text style={homeStyles.greenText}>Features</Text>
        </Text>
        <ScrollView>
          <Pressable onPress={()=>{navigation.navigate('Image Page')}}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Plant Disease Prediction</Text>
              <Text style={homeStyles.featureDesc}>props.description</Text>
            </View>
          </Pressable>
          <Pressable onPress={()=>{navigation.navigate('Form Page')}}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Fertiliser Prediction</Text>
              <Text style={homeStyles.featureDesc}>props.description</Text>
            </View>
          </Pressable>
          <Pressable onPress={()=>{navigation.navigate('Form Page')}}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Crop Prediction</Text>
              <Text style={homeStyles.featureDesc}>props.description</Text>
            </View>
          </Pressable>
          <Pressable onPress={()=>{navigation.navigate('Form Page')}}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Yeild Prediction</Text>
              <Text style={homeStyles.featureDesc}>props.description</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  greenText: {
    color: '#80E618',
  },
  pageHeader: {
    fontSize: 36,
    marginLeft: 18,
    marginTop: 18,
    marginBottom: 18,
    // textAlign: 'center',
  },
  carosuel: {
    height: 200,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureHeader: {
    fontSize: 24,
  },
  featureBox: {
    padding: 18,
    margin: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#80E618',
  },
  featureTitle: {
    fontSize: 20,
  },
  featureDesc: {
    fontSize: 12,
  },
  featureSection: {
    flex: 1,
    marginLeft: 18,
    marginTop: 18,
    marginRight: 18,
  },
});
