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
      <View style={homeStyles.featureSection}>
        <ScrollView>
          <View style={homeStyles.carosuel}>
            <Text>Here goes images carosuel</Text>
          </View>
          <View style = {homeStyles.featureSectionInnerBox}>
          <Text style={homeStyles.featureHeader}>
            Our <Text style={homeStyles.greenText}>Features</Text>
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Plant Disease Prediction Page');
            }}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>
                Plant Disease Prediction
              </Text>
              <Text style={homeStyles.featureDesc}>Predict plant diseases to protect your crops</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Fertiliser Prediction Page');
            }}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Fertiliser Prediction</Text>
              <Text style={homeStyles.featureDesc}>Choose fertilizers wisely for better harvests</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Crop Prediction Page');
            }}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Crop Prediction</Text>
              <Text style={homeStyles.featureDesc}>Know which crops will thrive in your soil</Text>
            </View>
          </Pressable>
          <Text style={homeStyles.featureHeader}>
            Our <Text style={homeStyles.greenText}>Upcoming Features</Text>
          </Text>
          <Pressable>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Yeild Prediction</Text>
              <Text style={homeStyles.featureDesc}>props.description</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Grading n Sorting</Text>
              <Text style={homeStyles.featureDesc}>Grade and sort produce efficiently</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>
                Real Time Soil and Climate Monitor
              </Text>
              <Text style={homeStyles.featureDesc}>Monitor soil and climate conditions in real-time</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Smart Farmer</Text>
              <Text style={homeStyles.featureDesc}>Get smart farming advice from AI assistant.</Text>
            </View>
          </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  featureSection:{
    flex: 1
  },
  featureSectionInnerBox: {
    marginLeft: 18,
    marginTop: 18,
    marginRight: 18,
  },
});
