import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const { width } = Dimensions.get('window');

const Carousel = ({ images }: { images: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const renderItem = ({ item }: { item: any }) => (
    <Image source={item} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};


export default function FeatureContainer({navigation}: {navigation: any}) {
  const isDark = useColorScheme() === 'dark';
  const images = [
    require('./Assets/sliding1.jpg'),
    require('./Assets/sliding2.jpg'),
    require('./Assets/sliding3.jpg')
  ]
  return (
    <SafeAreaView style={[homeStyles.container, isDark ? {backgroundColor: '#121212'}: null]}>
      <View>
        <Text style={[homeStyles.greenText, homeStyles.pageHeader]}>
          EcoHarvest
        </Text>
      </View>
      <View style={homeStyles.featureSection}>
        <ScrollView>
          <View>
            <Carousel images={images}></Carousel>
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
          <Pressable onPress={() => {
              navigation.navigate('Yeild Prediction Page');
            }}>
            <View style={homeStyles.featureBox}>
              <Text style={homeStyles.featureTitle}>Yield Prediction</Text>
              <Text style={homeStyles.featureDesc}>Estimate crop yield for better harvest planning.</Text>
            </View>
          </Pressable>
          <Text style={homeStyles.featureHeader}>
            Our <Text style={homeStyles.greenText}>Upcoming Features</Text>
          </Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: 'blue',
  },
});
