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

import {Picker} from '@react-native-picker/picker';

export default function FertiliserPredictionPage({
  navigation,
}: {
  navigation: any;
}) {
  const [temperature, setTemperature] = React.useState('');
  const [humidity, setHumidity] = React.useState('');
  const [moisture, setMoisture] = React.useState('');
  const [soilType, setSoilType] = React.useState('');
  const [cropType, setCropType] = React.useState('');
  const [nitrogen, setNitrogen] = React.useState('');
  const [potassium, setPotassium] = React.useState('');
  const [phosphorous, setPhosphorous] = React.useState('');
  const [prediction, setPrediction] = React.useState('');
  const [isPredicted, setIsPredicted] = React.useState(false);

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
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Temperature</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setTemperature}
                value={temperature}
                keyboardType="numeric"
                onChange={()=>{
                  setIsPredicted(false)
                }}
              />
              <Text style={{fontSize: 24}}>&deg;C</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Humidity</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setHumidity}
                value={humidity}
                keyboardType="numeric"
                onChange={()=>{
                  setIsPredicted(false)
                }}
              />
              <Text style={{fontSize: 24, minWidth: 200}}>
                g/m<Text style={{fontSize: 16}}>3</Text>
              </Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Moisture</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setMoisture}
                value={moisture}
                keyboardType="numeric"
                onChange={()=>{
                  setIsPredicted(false)
                }}
              />
              <Text style={{fontSize: 24, minWidth: 200}}>
                g/m<Text style={{fontSize: 16}}>3</Text>
              </Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Soil Type</Text>
            <View style={formStyles.dropdown}>
              <Picker
                selectedValue={soilType}
                onValueChange={itemValue => setSoilType(itemValue)}
                >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Clay" value="Clay" />
                <Picker.Item label="Sandy" value="Sandy" />
                <Picker.Item label="Loamy" value="Loamy" />
                <Picker.Item label="Black" value="Black" />
                <Picker.Item label="Red" value="Red" />
              </Picker>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Crop Type</Text>
            <View style={formStyles.dropdown}>
              <Picker
                selectedValue={cropType}
                onValueChange={itemValue => setCropType(itemValue)}>
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Maize" value="Maize" />
                <Picker.Item label="Sugarcane" value="Sugarcane" />
                <Picker.Item label="Cotton" value="Cotton" />
                <Picker.Item label="Tobacco" value="Tobacco" />
                <Picker.Item label="Paddy" value="Paddy" />
                <Picker.Item label="Barley" value="Barley" />
                <Picker.Item label="Wheat" value="Wheat" />
                <Picker.Item label="Millets" value="Millets" />
                <Picker.Item label="Oil Seeds" value="Oil Seeds" />
                <Picker.Item label="Pulses" value="Pulses" />
                <Picker.Item label="Ground Nuts" value="Ground Nuts" />
              </Picker>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Nitrogen</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setNitrogen}
                value={nitrogen}
                keyboardType="numeric"
                onChange={()=>{
                  setIsPredicted(false)
                }}
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Phosphorous</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setPhosphorous}
                value={phosphorous}
                keyboardType="numeric"
                onChange={()=>{
                  setIsPredicted(false)
                }}
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: 200}}>Potassium</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setPotassium}
                value={potassium}
                keyboardType="numeric"
                onChange={()=>{
                  setIsPredicted(false)
                }}
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <Pressable
            onPress={async () => {
              try {
                const response = await fetch(
                  'https://ecoharvest-tvtc.onrender.com/predict/fertilizer',
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
                      Soil_Type: soilType,
                      Crop_Type: cropType,
                      Nitrogen: nitrogen,
                      Potassium: potassium,
                      Phosphorous: phosphorous,
                    }),
                  },
                );

                console.log(response);
                const data = await response.json();

                setPrediction(data.predicted_fertilizer_name);
                setIsPredicted(true);
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
              marginBottom: 10,
            }}>
            <Text style={{color: 'white'}}>Predict</Text>
          </Pressable>
        </View>
        <View>
          {/* Predicted Values */}
          {
            isPredicted ? (
              <Text style={formStyles.formHeader}>
                Predicted Fertilizer is{' '}
                <Text style={{color: '#80E618'}}>{prediction}</Text>
              </Text>
            ) : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const formStyles = StyleSheet.create({
  formHeader: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    gap: 20,
  },
  formButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  formButtonText: {
    color: 'white',
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
  element: {
    // backgroundColor: 'aquamarine',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    height: 40,
    width: 80,
  },
  unit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdown: {
    // backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    width: 150,
  },
});
