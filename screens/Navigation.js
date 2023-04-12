import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { DeviceMotion } from 'expo-sensors'
import React, { useState, useEffect} from 'react';
import places from '../util/direction';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const Navigation = () => {
  const [alpha, setAlpha] = useState();
  const [beta, setBeta] = useState();
  const [gamma, setGamma] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    {label: 'culc', value: 'culc'},
    {label: 'crc', value: 'crc'},
    {label: 'scheller', value: 'scheller'},
    {label: 'coc', value: 'coc'},
    {label: 'bobbydodd', value: 'bobbyDodd'},
    {label: 'mccamish', value: 'mccamish'},
  ]);
  const [started, setStarted] = useState(false);
  const [direction, setDirection] = useState();
  const [heading, setHeading] = useState();

  const navigation = useNavigation();

  const home = () => {
    navigation.navigate("Welcome");
  }


  useEffect(() => {
    DeviceMotion.addListener((deviceMotion) => {
      setAlpha(deviceMotion.rotation.alpha);
      setBeta(deviceMotion.rotation.beta);
      setGamma(deviceMotion.rotation.gamma);
    })

    return () => {
      DeviceMotion.removeAllListeners();
    }
  }, [])

  const startNavigation = () => {
    if (!value || !value2) {
      alert("Must select starting point and destination");
      return;
    }
    setStarted(true);

    let start;
    for (x in places) {
      if (places[x][value] == "N/A") {
        start = places[x];
        if (places[x][value2] == "N/A") {
          alert("Starting point can't be the same as the destination");
          setStarted(false);
          return;
        }

      }
    }

    setDirection(start[value2]);
  }

  const getHeading = () => {
    if (alpha <= 0.36 && alpha > -0.36) {
      return "N";
    } else if (alpha <= -0.36 && alpha > -1.17) {
      return "NE";
    } else if (alpha <= -1.17 && alpha > -1.95) {
      return "E";
    } else if (alpha <= -1.95 && alpha > -2.72) {
      return "SE";
    } else if ((alpha <= -2.72 && alpha > -3.15) || (alpha <= 3.15 && alpha > 2.70)) {
      return "S";
    } else if (alpha <= 2.70 && alpha > 1.93) {
      return "SW";
    } else if (alpha <= 1.93 && alpha > 1.2) {
      return "W";
    } else if (alpha <= 1.2 && alpha > 0.36) {
      return "NW";
    }
  }

  const getStyling = () => {
    if (getHeading() == direction) {
      return styles.right;
    }

    return styles.wrong;
  }

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          placeholder='Starting Point'
          maxHeight={120}
        />
      </View>
      <View style={styles.selector}>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items}
          setOpen={setOpen2}
          setValue={setValue2}
          placeholder='Destination'
          maxHeight={120}
        />
      </View>
      <View>
        {!started && <TouchableOpacity style={styles.button} onPress={() => {startNavigation()}}>
          <Text>Start</Text>
        </TouchableOpacity>}
        {started && <Text style={getStyling()}>{getHeading()}</Text>}
      </View>
      {started && <TouchableOpacity style={styles.button} onPress={() => {setStarted(false)}}>
        <Text>End</Text>
      </TouchableOpacity> }
      <TouchableOpacity style={styles.button} onPress={home}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  selector: {
    marginBottom: 120,
    maxWidth: 350
  },
  button: {
    backgroundColor: 'white',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 30
  }, 
  right: {
    fontSize: 50,
    color: 'green',
    marginBottom: 20
  },
  wrong: {
    fontSize: 50,
    color: 'red',
    marginBottom: 20
  }
})