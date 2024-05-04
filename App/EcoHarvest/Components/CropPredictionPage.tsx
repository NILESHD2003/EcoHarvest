import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  
  export default function CropPredictionPage({navigation}: {navigation: any}) {

    const [temperature, setTemperature] = React.useState('');
    const [N, setN] = React.useState('');
    const [P, setP] = React.useState('');
    const [K, setK] = React.useState('');
    const [Humidity, setHumidity] = React.useState('');
    const [pH, setph] = React.useState('');
    const [rainfall, setRainfall] = React.useState('');
    const [prediction, setPrediction] = React.useState('');

    return (
      <SafeAreaView>
        <View style={formStyles.topBar}>
          <Text style={{fontSize: 24}}>
            <Text style={{color: '#80E618'}}>Crop</Text> Prediction
          </Text>
        </View>
        <ScrollView style={{marginTop: 20, marginBottom: 100}}>
          <View style={formStyles.formContainer}>
            <Text style={formStyles.formHeader}>
              Enter Details to get Prediction
            </Text>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>Temperature</Text>
              <TextInput
                value={temperature}
                onChangeText={text => {
                  setTemperature(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>Nitrogen</Text>
              <TextInput
                value={N}
                onChangeText={text => {
                  setN(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>Potassium</Text>
              <TextInput
                value={P}
                onChangeText={text => {
                  setP(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>Phosphorous</Text>
              <TextInput
                value={K}
                onChangeText={text => {
                  setK(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>Humidity</Text>
              <TextInput
                value={Humidity}
                onChangeText={text => {
                  setHumidity(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>PH</Text>
              <TextInput
                value={pH}
                onChangeText={text => {
                  setph(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <View style={formStyles.formElement}>
              <Text style={formStyles.formLabel}>Rainfall</Text>
              <TextInput
                value={rainfall}
                onChangeText={text => {
                  setRainfall(text);
                }}
                style={formStyles.formInput}
                keyboardType='decimal-pad'></TextInput>
            </View>
            <Pressable
              onPress={async () => {
                try {
                  const response = await fetch(
                    'https://temp-ecoharvest.onrender.com/crop_predict',
                    {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        temperature: temperature,
                        N: N,
                        P: P,
                        K: K,
                        humidity: Humidity,
                        ph: pH,
                        rainfall: rainfall,
                      }),
                    },
                  );
                  
                  const data = await response.json();
  
                  setPrediction(data.prediction);
                } catch (e) {
                  console.log(e);
                }
              }}
              style={{
                backgroundColor: '#80E618',
                height: 40,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <Text style={{color: 'white'}}>Predict</Text>
            </Pressable>
          </View>
          <View>
            {/* Predicted Values */}
            <Text style={formStyles.formHeader}>Predicted Crop is <Text style = {{color: '#80E618'}}>{prediction}</Text></Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const formStyles = StyleSheet.create({
    formHeader: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    formContainer: {
      margin: 20,
    },
    formInput: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#80E618',
      padding: 10,
      marginBottom: 10,
      marginLeft: 'auto',
      height: 60,
      width: 60,
      marginRight: '40%',
    },
    formLabel: {
      marginBottom: 10,
      fontSize: 18,
    },
    formInput2: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#80E618',
      padding: 10,
      marginBottom: 10,
      marginLeft: 'auto',
      height: 60,
      width: 200,
      marginRight: '5%',
    },
    formButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formButtonText: {
      color: 'white',
    },
    formElement: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderColor: '#80E618',
      gap: 40,
    },
  });
  