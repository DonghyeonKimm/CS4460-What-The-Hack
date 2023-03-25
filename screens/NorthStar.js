import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import {Gyroscope, Barometer, Magnetometer, Accelerometer, DeviceMotion} from 'expo-sensors'
import React, { useState, useEffect} from 'react';

const NorthStar = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(); 
    const [alpha, setAlpha] = useState();
    const [beta, setBeta] = useState();
    const [gamma, setGamma] = useState();
    const [found, setFound] = useState(false);
    const [foundN, setFoundN] = useState(false);
    
    let north = false;

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status == "granted");
        })();
    }, [])

    const check = () => {
        if ((alpha <= -3 && alpha >= -3.12) && (beta <= 1.1 && beta >= 0.80)) {
            setFound(true);
        } else {
            setFound(false);
        }   
    }

    const navigateUp = () => {
        if (beta > 1.1 && foundN) {
            return true;
        }

        return false;
    }

    const navigateDown = () => {
        if (beta < 0.80 && foundN && (gamma < -2.9 || gamma > 3)) {
            return true;
        }

        return false;
    }

    const navigateLeft = () => {
        if (alpha < -0.15 && alpha < 1.00 && alpha > -1) {
            return true;
        } else if (beta > 0.7 && alpha >= 3) {
            return true;
        }

        return false;
    }

    const navigateRight = () => {
        if (alpha > 0.15 && alpha < 1.00 && alpha > -1) {
            return true;
        } else if (beta > 0.7 && (alpha >= -3.0 && alpha < -1)) {
            return true;
        }

        return false;
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

    useEffect(() => {
        if (!north) {
            if (alpha > -0.05 && alpha < 0.05) {
                setFoundN(true);
            }
        }
        check();
    })

  return (
    <View style={styles.container}>
        <View style={styles.data}>
            <Text style={styles.dataText}>Alpha "North": {alpha}</Text>
            <Text style={styles.dataText}>Beta "Up-Down": {beta}</Text>
            <Text style={styles.dataText}>Gamma "Left-Right": {gamma}</Text>
        </View>
        <View style={styles.inside}>
            <AntDesign name="caretup" style={navigateUp() ? styles.iconA : styles.iconD}/>
            <View style={styles.block}>
                <AntDesign name="caretleft" style={navigateLeft() ? styles.iconA : styles.iconD}/>
                <View style={found ? styles.found : styles.notFound }>
                    <Camera style={styles.camera} type={CameraType.back} />
                </View>
                <AntDesign name="caretright" style={navigateRight() ? styles.iconA : styles.iconD}/>
            </View>
            <AntDesign name="caretdown" color="black" style={navigateDown() ? styles.iconA : styles.iconD}/>
        </View>
        <TouchableOpacity style={found ? styles.buttonFound : styles.button} disabled={!found}>
            <Text>Found It</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NorthStar

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    inside: {
        height: '70%',
        width: '850%',
        // backgroundColor: 'red',
        alignSelf: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },  
    navigation: {
        marginTop: 200,
        padding: 500,
        // color: 'blue'
    },
    block: {
        padding: 10,
        color: 'red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    camera: {
        fontSize: 200,
        paddingHorizontal: 120,
        paddingVertical: 200,
        backgroundColor: 'blue'
    },
    data: {
        width: 315,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    dataText: {
        color: 'white',
    },
    iconA: {
        opacity: 1,
        fontSize: 75,
        color: 'white'
    },
    iconD: {
        opacity: 0.1,
         fontSize: 75,
        color: 'white'
    },
    found: {
        borderWidth: 2,
        borderColor: 'green'
    },
    notFound: {
        borderWidth: 2,
        borderColor: 'red'
    },
    buttonFound: {
        backgroundColor: 'white',
        width: '40%',
        height: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'white',
        width: '40%',
        height: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        alignSelf: 'center',
        opacity: 0.2
    }
})