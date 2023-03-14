import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Gyroscope, Barometer, Magnetometer, Accelerometer} from 'expo-sensors'

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


    const longitude = route.params.longitude;
    const latitude = route.params.latitude;

    let heading = 0;
    let tNorth = 0;
    let ready = false;

    useEffect(() => {
        const subscription1 = Accelerometer.addListener(({x, y, z}) => {
            setData({x, y, z});
        });

        const subscription2 = Gyroscope.addListener(({x, y, z}) => {
            setGX(x);
            setGY(y);
            setGZ(z);
        });

        const subscription3 = Barometer.addListener(setData2);

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
        }
    }, [])

    useEffect(() => {
        console.log(Math.atan2(mY, mX) * (180 / Math.PI))
    })

    useEffect(() => {
        fetch('https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination' +
            '?lat1=' + latitude + '&lon1=' + longitude + '&key=zNEw7&resultFormat=csv')
        .then(response => response.text()).then(text => {
            let declination = parseFloat(text.replace(/^#.*$/gm, '').trim().split(',')[4]);
            // Compensate for the magnetic declination to get the geographic north.
            console.log(declination);
            ready = true;
        });
    }, [])

    useEffect(() => {
        // if (!ready) {
        //     console.log("Heading: " + heading + " True North: " + tNorth);
        // }   
    })

    


    return (
        <View style={styles.dataContainer}>
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
        </View>
    )
}

export default SensorTest

const styles = StyleSheet.create({
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