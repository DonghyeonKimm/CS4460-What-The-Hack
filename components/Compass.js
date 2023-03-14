import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const Compass = () => {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);
    const [north, setNorth] = useState(false);

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
        if((x >= -7 && x <= 7) && y >= 0) {
            return styles.north;
        }
        return styles.notNorth;
    }

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <Text style={getHeading()}>N</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text>Next Step</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Compass

const styles = StyleSheet.create({
    container: {
        padding: 50,
        marginTop: 40
    },
    north: {
        color: 'darkgreen',
        fontSize: 60,
        alignSelf: 'center'
    },
    aboutNorth: {
        color: 'yellow',
        fontSize: 60,
        alignSelf: 'center'
    },  
    notNorth: {
        color: 'red',
        fontSize: 60,
        alignSelf: 'center'
    },
    button: {
        marginTop: 60,
        backgroundColor: 'white',
        width: 280,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    }
})