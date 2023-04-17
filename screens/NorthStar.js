import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import {Gyroscope, Barometer, Magnetometer, Accelerometer, DeviceMotion} from 'expo-sensors'
import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

const NorthStar = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(); 
    const [alpha, setAlpha] = useState();
    const [beta, setBeta] = useState();
    const [gamma, setGamma] = useState();
    const [found, setFound] = useState(false);
    const [foundN, setFoundN] = useState(false);
    
    let north = false;

    const navigation = useNavigation();

    const foundIt = () => {
        navigation.navigate("Welcome");
    }

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

    const getHeading = () => {
        if (alpha <= 0.36 && alpha > -0.36) {
            return "N"
        } else if (alpha <= -0.36 && alpha > -1.17) {
            return "NE"
        } else if (alpha <= -1.17 && alpha > -1.95) {
            return "E"
        } else if (alpha <= -1.95 && alpha > -2.72) {
            return "SE"
        } else if ((alpha <= -2.72 && alpha > -3.15) || (alpha <= 3.15 && alpha > 2.70)) {
            return "S"
        } else if (alpha <= 2.70 && alpha > 1.93) {
            return "SW"
        } else if (alpha <= 1.93 && alpha > 1.2) {
            return "W"
        } else if (alpha <= 1.2 && alpha > 0.36) {
            return "NW";
        }
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
        getHeading();
        check();
    })

    const startNavigation = () => {
        navigation.navigate("Navigation");
    }

  return (
    <View style={styles.container}>
        {/* <View style={styles.data}>
            <Text style={styles.dataText}>Alpha "North": {alpha}</Text>
            <Text style={styles.dataText}>Beta "Up-Down": {beta}</Text>
            <Text style={styles.dataText}>Gamma "Left-Right": {gamma}</Text>
        </View> */}
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
        <TouchableOpacity style={found ? styles.buttonFound : styles.button} disabled={!found} onPress={startNavigation}>
            <Text>Start Navigation</Text>
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
        alignSelf: 'center',
        marginBottom: 10
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
        opacity: 0.2,
        marginBottom: 20,
        marginBottom: 10
    }
})