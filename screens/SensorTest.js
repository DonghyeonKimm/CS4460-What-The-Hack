import { StyleSheet, Text, View , Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Gyroscope, Barometer, Magnetometer, Accelerometer, DeviceMotion} from 'expo-sensors'
const PlaceholderImage = require('/Users/donghyeonkim/Documents/GitHub/CS4460-What-The-Hack/assets/images/nightsky.jpeg');

const SensorTest = ({route}) => {
    //ACCELEROMETER
    const [ {x, y, z}, setData] = useState({x, y, z});

    //BAROMETER
    const [ {pressure, relativeAltitude}, setData2] = useState({pressure, relativeAltitude});

    //GYROSCOPE
    const [gX, setGX] = useState();
    const [gY, setGY] = useState();
    const [gZ, setGZ] = useState();

    //MAGNETOMETER
    const [mX, setMX] = useState();
    const [mY, setMY] = useState();
    const [mZ, setMZ] = useState();

    const [alpha, setAlpha] = useState();
    const [beta, setBeta] = useState();
    const [gamma, setGamma] = useState();

    let heading = 0;
    let tNorth = 0;
    let ready = false;

    useEffect(() => {
        const subscription1 = Accelerometer.addListener(({x, y, z}) => {
            setData({x, y, z});

            // setPitch(Math.atan2(x, z) * 180 / Math.PI);
            // setRoll(Math.atan2(y, z) * 180 / Math.PI);
        });

        const subscription2 = Gyroscope.addListener(({x, y, z}) => {
            setGX(x);
            setGY(y);
            setGZ(z);
        });

        const subscription3 = Barometer.addListener(setData2);

        DeviceMotion.addListener((deviveMotion) => {
            setAlpha(deviveMotion.rotation.alpha);
            setBeta(deviveMotion.rotation.beta);
            setGamma(deviveMotion.rotation.gamma);
        })

        const subscription4 = Magnetometer.addListener(({x, y, z}) => {
            setMX(x);
            setMY(y);
            setMZ(z);
        });

        return () => {
            subscription1.remove();
            subscription2.remove();
            subscription3.remove();
            subscription4.remove();
            DeviceMotion.removeAllListeners();
        }
    }, [])

    useEffect(() => {
        //console.log(Math.atan2(mY, mX) * (180 / Math.PI))
    })

    useEffect(() => {
        // if (!ready) {
        //     console.log("Heading: " + heading + " True North: " + tNorth);
        // }   
    })

    


    return (
        <View style={styles.dataContainer}>
            <View style={styles.imageContainer}>
            <Image source={PlaceholderImage} style={styles.image} />
            </View>
            <View style={styles.data}>
                <Text>Accelerometer</Text>
                <Text>X: {x}</Text>
                <Text>Y: {y}</Text>
                <Text>Z: {z}</Text>
            </View>
            <View style={styles.data}>
                <Text>Gyroscope</Text>
                <Text>X: {gX}</Text>
                <Text>Y: {gY}</Text>
                <Text>Z: {gZ}</Text>
            </View>
            <View style={styles.data}>
                <Text>Magnetometer</Text>
                <Text>X: {mX}</Text>
                <Text>Y: {mY}</Text>
                <Text>Z: {mZ}</Text>
            </View>
            <View style={styles.data}>
                <Text>Barometer</Text>
                <Text>Pressure: {pressure}</Text>
                <Text>Relative Altitude: {relativeAltitude}</Text>
            </View>
            <View style={styles.data}>
                <Text>Orientation</Text>
                <Text>Alpha "North": {alpha}</Text>
                <Text>Beta "Up-Down": {beta}</Text>
                <Text>Gamma "Left-Right": {gamma}</Text>
            </View>
        </View>
    )
}

export default SensorTest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
      top: 0,
        flex: 1,
        paddingTop: 0,
    },
    image: {
        top: 50,
        width: 400,
        height: 900,
        borderRadius: 18,
    },
    dataContainer: {
        marginTop: 125,
    },
    data: {
        width: 315,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 60,
    }
})