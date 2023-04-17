import React, { useState, useEffect } from 'react';
import MapView, { Circle } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NorthStar from './NorthStar';

export default function App() {
    const navigation = useNavigation();

    const northStar = () => {
        navigation.navigate("NorthStar");
    }

  const [pin, setPin] = React.useState({
    latitude: 33.7756,  //default location
    longitude: -84.3902,
  });

  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude:location.coords.longitude
      });
    })();
  }, []);


  return (
    <View style={styles.container}>
        
      <MapView style = {styles.map}
        initialRegion={{
          latitude: 33.7756,
          longitude: -84.3902,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0005,
        }}
        showsUserLocation = {true}
      >
        <Marker
  coordinate={pin}
  title = "Set Location"
  description = "Current Location"
  pinColor='red'
  draggable = {true}
  onDragStart = {(e) => {
    console.log("Drag Start", e.nativeEvent.coordinate);
  }}
  onDragEnd = {(e) => {
    console.log("Drag End", e.nativeEvent.coordinate);
    
    setPin({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude:e.nativeEvent.coordinate.longitude
    });
  }}
  ></Marker> 
  <Circle
    center ={pin}
    radius = {50}
    />
  </MapView>  
  <TouchableOpacity style={styles.startButton} onPress={northStar}>
                <MaterialCommunityIcons name="star-shooting-outline" size={24} color="black" />
                <Text>Find North Star</Text>
    </TouchableOpacity> 
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});