import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react'
import Compass from '../components/Compass';

const Home = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();


  let fLocation = "waiting";
  if (location) {
    fLocation = location;
  }

  const data = () => {
    navigation.navigate("SensorTest");
  } 

  return (
    <View style={styles.container}>
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