import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

export default function PlantDiseasePredictionPage() {
  const [isImageUploaded, setIsImageUploaded] = React.useState(false);

  return (
    <SafeAreaView>
      <View style={formStyles.topBar}>
        <Text style={{fontSize: 24}}>
          <Text style={{color: '#80E618'}}>Disease</Text> Prediction
        </Text>
      </View>
      <ScrollView style={{marginTop: 20, marginBottom: 100}}>
        <View style={formStyles.formContainer}>
          <Text style={formStyles.formHeader}>
            Upload Image to Detect Disease
          </Text>
          <View>
            <View>
              {isImageUploaded ? <Text>true</Text> : <Text>false</Text>}
            </View>
            <Pressable>
              <Text>Upload</Text>
            </Pressable>
          </View>
          {isImageUploaded ? (
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
                        // Req body goes here
                      }),
                    },
                  );

                  const data = await response.json();

                  // setPrediction(data.prediction);
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
              <Text style={{color: 'white'}}>Detect</Text>
            </Pressable>
          ) : null}
        </View>
        <View>
          {/* Predicted Values */}
          <Text style={formStyles.formHeader}>
            Predicted Crop is <Text style={{color: '#80E618'}}>detected</Text>
          </Text>
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
