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
  const [humidity, setHumidity] = React.useState('');
  const [pH, setph] = React.useState('');
  const [rainfall, setRainfall] = React.useState('');
  const [prediction, setPrediction] = React.useState('');
  const [isPredicted, setIsPredicted] = React.useState(false);

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
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>Temperature</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setTemperature}
                value={temperature}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24}}>&deg;C</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>Humidity</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setHumidity}
                value={humidity}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24, minWidth: '50%'}}>
                g/m<Text style={{fontSize: 16}}>3</Text>
              </Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>Rainfall</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setRainfall}
                value={rainfall}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24, minWidth: '50%'}}>
                mm
              </Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>Nitrogen</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setN}
                value={N}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>Phosphorous</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setP}
                value={P}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>Potassium</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setK}
                value={K}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <View style={formStyles.element}>
            <Text style={{fontSize: 24, minWidth: '50%'}}>PH</Text>
            <View style={formStyles.unit}>
              <TextInput
                style={formStyles.input}
                onChangeText={setph}
                value={pH}
                keyboardType="numeric"
              />
              <Text style={{fontSize: 24}}>%</Text>
            </View>
          </View>
          <Pressable
            onPress={async () => {
              try {
                const response = await fetch(
                  'https://ecoharvest-tvtc.onrender.com/predict/crop',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "N": N,
                      "P": P,
                      "K": K,
                      "temperature": temperature,
                      "humidity": humidity,
                      "ph": pH,
                      "rainfall": rainfall
                  }),
                  },
                );

                console.log(response);
                const data = await response.json();
                console.log(data.prediction);

                setPrediction(data.prediction);
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
            }}>
            <Text style={{color: 'white'}}>Predict</Text>
          </Pressable>
        </View>
        <View>
          {
            isPredicted ? (<Text style={formStyles.formHeader}>
              Predicted Crop is{' '}
              <Text style={{color: '#80E618'}}>{prediction}</Text>
            </Text>) : null
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
    marginBottom: 20,
  },
  formContainer: {
    margin: 20,
    gap: 20,
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
