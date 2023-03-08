import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const Home = () => {
  const navigation = useNavigation();

  const data = () => {
    navigation.navigate("SensorTest");
  } 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={data}>
        <Text>Sensor Data</Text>
      </TouchableOpacity>
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
  }
})