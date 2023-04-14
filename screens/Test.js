import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function Try() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Magnetometer.setUpdateInterval(1000);
  const _fast = () => Magnetometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  
  //-10 -> -25
  const getHeading = () => {
    if((x >= -1 && x <= 1) && y >= 0) {
      return "Green North";
    } else if ((x >= -10 && x <= 10) && y >= 0) {
      return "North";
    } 
  }

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View styles={styles.container}>
      <Text style={styles.text}>Magnetometer:</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <Text style={styles.text}>Heading: {getHeading()}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginLeft: 200,
    marginTop: 200,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
    backgroundColor: 'red',
  },
  text: {
    color: 'white'
  }
})