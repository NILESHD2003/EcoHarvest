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

export default function FertiliserPredictionPage({navigation}: {navigation: any}) {
  const [temperature, setTemperature] = React.useState('');
  const [humidity, setHumidity] = React.useState('');
  const [moisture, setMoisture] = React.useState('');
  const [soilType, setSoilType] = React.useState('');
  const [cropType, setCropType] = React.useState('');
  const [nitrogen, setNitrogen] = React.useState('');
  const [potassium, setPotassium] = React.useState('');
  const [phosphorous, setPhosphorous] = React.useState('');

  const [prediction, setPrediction] = React.useState('');

  return (
    <SafeAreaView>
      <View style={formStyles.topBar}>
        <Text style={{fontSize: 24}}>
          <Text style={{color: '#80E618'}}>Fertiliser</Text> Prediction
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
              keyboardType="decimal-pad"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Humidity</Text>
            <TextInput
              value={humidity}
              onChangeText={text => {
                setHumidity(text);
              }}
              style={formStyles.formInput}
              keyboardType="numeric"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Moisture</Text>
            <TextInput
              value={moisture}
              onChangeText={text => {
                setMoisture(text);
              }}
              style={formStyles.formInput}
              keyboardType="numeric"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Soil Type</Text>
            <TextInput
              value={soilType}
              onChangeText={text => {
                setSoilType(text);
              }}
              style={formStyles.formInput2}
              keyboardType="default"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Crop Type</Text>
            <TextInput
              value={cropType}
              onChangeText={text => {
                setCropType(text);
              }}
              style={formStyles.formInput2}
              keyboardType="default"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Nitrogen</Text>
            <TextInput
              value={nitrogen}
              onChangeText={text => {
                setNitrogen(text);
              }}
              style={formStyles.formInput}
              keyboardType="numeric"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Potassium</Text>
            <TextInput
              value={potassium}
              onChangeText={text => {
                setPotassium(text);
              }}
              style={formStyles.formInput}
              keyboardType="numeric"></TextInput>
          </View>
          <View style={formStyles.formElement}>
            <Text style={formStyles.formLabel}>Phosphorous</Text>
            <TextInput
              value={phosphorous}
              onChangeText={text => {
                setPhosphorous(text);
              }}
              style={formStyles.formInput}
              keyboardType="numeric"></TextInput>
          </View>
          <Pressable
            onPress={async () => {
              try {
                const response = await fetch(
                  'https://temp-ecoharvest.onrender.com/fertilizer_predict',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      Temperature: temperature,
                      Humidity: humidity,
                      Moisture: moisture,
                      'Soil Type': soilType,
                      'Crop Type': cropType,
                      Nitrogen: nitrogen,
                      Potassium: potassium,
                      Phosphorous: phosphorous,
                    }),
                  },
                );
                
                console.log(response)
                const data = await response.json();

                setPrediction(data.predicted_fertilizer_name);
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
          <Text style={formStyles.formHeader}>Predicted Fertiliser is{" "}<Text style = {{color: '#80E618'}}>{prediction}</Text></Text>
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
