import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react'
import Compass from '../components/Compass';

const Home = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);



  let fLocation = "waiting";
  if (location) {
    fLocation = location;
  }

  const data = () => {
    navigation.navigate("SensorTest", {
      longitude: fLocation.coords.longitude,
      latitude: fLocation.coords.latitude
    });
  } 

  return (
    <View style={styles.container}>
      {location && <View style={styles.location}>
        <Text>Longitude: {fLocation.coords.longitude}</Text>
        <Text>Latitude: {fLocation.coords.latitude}</Text>
      </View>}
      <TouchableOpacity style={styles.button} onPress={data}>
        <Text>Sensor Data</Text>
      </TouchableOpacity>
      <Compass />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  location: {
    marginBottom: 30
  }
})