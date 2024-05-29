import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, useColorScheme } from 'react-native'
import React from 'react'

import {Picker} from '@react-native-picker/picker';

export default function YeildPredictionPage() {

  function multiplyBy100(str: string) {
    // Convert the string to a floating-point number
    let num = parseFloat(str);
  
    // Multiply the number by 100 and round to 2 decimal places
    let roundedResult = (num * 100).toFixed(2);
  
    // Convert the rounded result back to a string
    let result = roundedResult.toString();
  
    // Return the result
    return result;
  }

  const isDark = useColorScheme() === 'dark';

  const [isPredicted, setIsPredicted] = React.useState(false);
  const [crop, setCrop] = React.useState('');
  const [season, setSeason] = React.useState('');
  const [state, setState] = React.useState('');
  const [cropYear, setCropYear] = React.useState('');
  const [area, setArea] = React.useState('');
  const [production, setProduction] = React.useState('');
  const [annualRainfall, setAnnualRainfall] = React.useState('');
  const [fertilizer, setFertilizer] = React.useState('');
  const [pesticide, setPesticide] = React.useState('');
  const [prediction, setPrediction] = React.useState('');
  return (
    <SafeAreaView style = {isDark ? {backgroundColor: '#121212'} : null}>
    <View style={formStyles.topBar}>
      <Text style={{fontSize: 24}}>
        <Text style={{color: '#80E618'}}>Yield</Text> Prediction
      </Text>
    </View>
    <ScrollView style={{marginTop: 20, marginBottom: 100}}>
      <View style={formStyles.formContainer}>
        <Text style={formStyles.formHeader}>
          Enter Details to get Prediction
        </Text>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Crop</Text>
          <View style={formStyles.dropdown}>
            <Picker
              selectedValue={crop}
              onValueChange={itemValue => setCrop(itemValue)}
              >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Arecanut" value="Arecanut" />
              <Picker.Item label="Arhar/Tur" value="Arhar/Tur" />
              <Picker.Item label="Bajra" value="Bajra" />
              <Picker.Item label="Banana" value="Banana" />
              <Picker.Item label="Barley" value="Barley" />
              <Picker.Item label="Black pepper" value="Black pepper" />
              <Picker.Item label="Cardamom" value="Cardamom" />
              <Picker.Item label="Cashewnut" value="Cashewnut" />
              <Picker.Item label="Castor seed" value="Castor seed" />
              <Picker.Item label="Coconut " value="Coconut " />
              <Picker.Item label="Coriander" value="Coriander" />
              <Picker.Item label="Cotton(lint)" value="Cotton(lint)" />
              <Picker.Item label="Cowpea(Lobia)" value="Cowpea(Lobia)" />
              <Picker.Item label="Dry chillies" value="Dry chillies" />
              <Picker.Item label="Garlic" value="Garlic" />
              <Picker.Item label="Ginger" value="Ginger" />
              <Picker.Item label="Gram" value="Gram" />
              <Picker.Item label="Groundnut" value="Groundnut" />
              <Picker.Item label="Guar seed" value="Guar seed" />
              <Picker.Item label="Horse-gram" value="Horse-gram" />
              <Picker.Item label="Jowar" value="Jowar" />
              <Picker.Item label="Jute" value="Jute" />
              <Picker.Item label="Khesari" value="Khesari" />
              <Picker.Item label="Linseed" value="Linseed" />
              <Picker.Item label="Maize" value="Maize" />
              <Picker.Item label="Masoor" value="Masoor" />
              <Picker.Item label="Mesta" value="Mesta" />
              <Picker.Item label="Moong(Green Gram)" value="Moong(Green Gram)" />
              <Picker.Item label="Moth" value="Moth" />
              <Picker.Item label="Niger seed" value="Niger seed" />
              <Picker.Item label="Oilseeds" value="Oilseeds total" />
              <Picker.Item label="Onion" value="Onion" />
              <Picker.Item label="Other  Rabi pulses" value="Other  Rabi pulses" />
              <Picker.Item label="Other Cereals" value="Other Cereals" />
              <Picker.Item label="Other Kharif pulses" value="Other Kharif pulses" />
              <Picker.Item label="Other Summer Pulses" value="Other Summer Pulses" />
              <Picker.Item label="Peas & beans (Pulses)" value="Peas & beans (Pulses)" />
              <Picker.Item label="Potato" value="Potato" />
              <Picker.Item label="Ragi" value="Ragi" />
              <Picker.Item label="Rapeseed &Mustard" value="Rapeseed &Mustard" />
              <Picker.Item label="Rice" value="Rice" />
              <Picker.Item label="Safflower" value="Safflower" />
              <Picker.Item label="Sannhamp" value="Sannhamp" />
              <Picker.Item label="Sesamum" value="Sesamum" />
              <Picker.Item label="Small millets" value="Small millets" />
              <Picker.Item label="Soyabean" value="Soyabean" />
              <Picker.Item label="Sugarcane" value="Sugarcane" />
              <Picker.Item label="Sunflower" value="Sunflower" />
              <Picker.Item label="Sweet potato" value="Sweet potato" />
              <Picker.Item label="Tapioca" value="Tapioca" />
              <Picker.Item label="Tobacco" value="Tobacco" />
              <Picker.Item label="Turmeric" value="Turmeric" />
              <Picker.Item label="Urad" value="Urad" />
              <Picker.Item label="Wheat" value="Wheat" />
              <Picker.Item label="Other oilseeds" value="other oilseeds" />
            </Picker>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Season</Text>
          <View style={formStyles.dropdown}>
            <Picker
              selectedValue={season}
              onValueChange={itemValue => setSeason(itemValue)}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Autumn" value="Autumn" />
              <Picker.Item label="Kharif" value="Kharif" />
              <Picker.Item label="Rabi" value="Rabi" />
              <Picker.Item label="Summer" value="Summer" />
              <Picker.Item label="Whole Year" value="Whole Year" />
              <Picker.Item label="Winter" value="Winter" />
            </Picker>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>State</Text>
          <View style={formStyles.dropdown}>
            <Picker
              selectedValue={state}
              onValueChange={itemValue => setState(itemValue)}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
              <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
              <Picker.Item label="Assam" value="Assam" />
              <Picker.Item label="Bihar" value="Bihar" />
              <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
              <Picker.Item label="Delhi" value="Delhi" />
              <Picker.Item label="Goa" value="Goa" />
              <Picker.Item label="Gujarat" value="Gujarat" />
              <Picker.Item label="Haryana" value="Haryana" />
              <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
              <Picker.Item label="Jammu and Kashmir" value="Jammu and Kashmir" />
              <Picker.Item label="Jharkhand" value="Jharkhand" />
              <Picker.Item label="Karnataka" value="Karnataka" />
              <Picker.Item label="Kerala" value="Kerala" />
              <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
              <Picker.Item label="Maharashtra" value="Maharashtra" />
              <Picker.Item label="Manipur" value="Manipur" />
              <Picker.Item label="Meghalaya" value="Meghalaya" />
              <Picker.Item label="Mizoram" value="Mizoram" />
              <Picker.Item label="Nagaland" value="Nagaland" />
              <Picker.Item label="Odisha" value="Odisha" />
              <Picker.Item label="Puducherry" value="Puducherry" />
              <Picker.Item label="Punjab" value="Punjab" />
              <Picker.Item label="Sikkim" value="Sikkim" />
              <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
              <Picker.Item label="Telangana" value="Telangana" />
              <Picker.Item label="Tripura" value="Tripura" />
              <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
              <Picker.Item label="Uttarakhand" value="Uttarakhand" />
              <Picker.Item label="West Bengal" value="West Bengal" />
            </Picker>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Crop Year</Text>
          <View style={formStyles.unit}>
            <TextInput
              style={formStyles.input}
              onChangeText={setCropYear}
              value={cropYear}
              keyboardType="numeric"
              onChange={()=>{
                setIsPredicted(false)
              }}
            />
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Area</Text>
          <View style={formStyles.unit}>
            <TextInput
              style={formStyles.input}
              onChangeText={setArea}
              value={area}
              keyboardType="numeric"
              onChange={()=>{
                setIsPredicted(false)
              }}
            />
            <Text style={{fontSize: 24}}>sq.ft</Text>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Production</Text>
          <View style={formStyles.unit}>
            <TextInput
              style={formStyles.input}
              onChangeText={setProduction}
              value={production}
              keyboardType="numeric"
              onChange={()=>{
                setIsPredicted(false)
              }}
            />
            <Text style={{fontSize: 24}}>Kg</Text>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Annual Rainfall</Text>
          <View style={formStyles.unit}>
            <TextInput
              style={formStyles.input}
              onChangeText={setAnnualRainfall}
              value={annualRainfall}
              keyboardType="numeric"
              onChange={()=>{
                setIsPredicted(false)
              }}
            />
            <Text style={{fontSize: 24}}>mm</Text>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Fertilizer</Text>
          <View style={formStyles.unit}>
            <TextInput
              style={formStyles.input}
              onChangeText={setFertilizer}
              value={fertilizer}
              keyboardType="numeric"
              onChange={()=>{
                setIsPredicted(false)
              }}
            />
            <Text style={{fontSize: 24}}>Kg</Text>
          </View>
        </View>
        <View style={formStyles.element}>
          <Text style={{fontSize: 24, minWidth: '50%'}}>Pesticide</Text>
          <View style={formStyles.unit}>
            <TextInput
              style={formStyles.input}
              onChangeText={setPesticide}
              value={pesticide}
              keyboardType="numeric"
              onChange={()=>{
                setIsPredicted(false)
              }}
            />
            <Text style={{fontSize: 24}}>Kg</Text>
          </View>
        </View>
        <Pressable
          onPress={async () => {
            try {
              const response = await fetch(
                'https://ecoharvest-tvtc.onrender.com/predict/yield',
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    crop : crop ,
                    crop_year : cropYear,
                    season : season ,
                    state : state,
                    area : area ,
                    production : area ,
                    annual_rainfall : annualRainfall,
                    fertilizer : fertilizer,
                    pesticide : pesticide
                }),
                },
              );

              console.log(response);
              const data = await response.json();
              console.log(data);
              const predYeild = data.yield_prediction;
              console.log(predYeild);
              setPrediction(multiplyBy100(predYeild));
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
              Predicted Yield is{' '}
              <Text style={{color: '#80E618'}}>{prediction}%</Text>
            </Text>
          ) : null
        }
      </View>
    </ScrollView>
  </SafeAreaView>
  )
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