import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function PlantDiseasePredictionPage() {
  const [isImageUploaded, setIsImageUploaded] = React.useState(false);
  const [imageSource, setImageSource] = React.useState<string>('');
  const [predictedDisease, setPredictedDisease] = React.useState('');
  const [isPredicted, setIsPredicted] = React.useState(false);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets &&
        response.assets[0].uri
      ) {
        setIsImageUploaded(true);
        console.log(response.assets[0].uri);
        setImageSource(response.assets[0].uri);
        console.log(imageSource);
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={formStyles.topBar}>
        <Text style={{fontSize: 24}}>
          <Text style={{color: '#80E618'}}>Plant Disease</Text> Prediction
        </Text>
      </View>
      <ScrollView style={{marginTop: 20, marginBottom: 100}}>
        <View style={formStyles.formContainer}>
          <View>
            <View>
              {(isImageUploaded) ? (<Image
                source={{uri: imageSource}}
                style={{width: 200, height: 200, alignSelf: 'center'}}
              />) : (<Image
                source={require('./Assets/uploadIcon.png')}
                style={{width: 200, height: 200, alignSelf: 'center'}}
              />)}
            </View>
            {
              isImageUploaded ? null : (<Text style={formStyles.formHeader}>Upload Image</Text>)
            }
            <View style={formStyles.buttonContainer}>
              <Pressable style={formStyles.buttonP} onPress={selectImage}>
                <Text style={{color: 'white'}}>Upload</Text>
              </Pressable>
              <Pressable style={formStyles.button} onPress={()=>{
                setIsImageUploaded(false);
                setImageSource('');
              }}>
                <Text style={{color: '#80E618'}}>Reset</Text>
              </Pressable>
            </View>
          </View>
          {isImageUploaded ? (
            <Pressable
              onPress={() => {
                const formData = new FormData();
                formData.append('image', {
                  uri: imageSource,
                  type: 'image/jpeg',
                  name: 'image.jpg',
                });

                fetch('https://ecoharvest-tvtc.onrender.com/detect/plantdisease', {
                  method: 'POST',
                  body: formData,
                })
                  .then(response => response.json())
                  .then(data => {
                    // Handle the response data
                    console.log(data);
                    setPredictedDisease(data.predicted_disease);
                    setIsPredicted(true);
                  })
                  .catch(error => {
                    // Handle the error
                    console.error(error);
                  });
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
              <Text style={{color: 'white'}}>Detect</Text>
            </Pressable>
          ) : null}
        </View>
        <View>
          {/* Predicted Values */}
          {
            isPredicted ? (<Text style={formStyles.formHeader}>
              Predicted Crop is <Text style={{color: '#80E618'}}>{predictedDisease}</Text>
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
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  button: {
    // backgroundColor: 'white',
    borderColor: '#80E618',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  buttonP: {
    backgroundColor: '#80E618',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
});
