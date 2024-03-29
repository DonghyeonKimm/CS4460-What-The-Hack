import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'; 
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

const PlaceholderImage = require('C:/Users/donye/Downloads/MUC/CS4460-What-The-Hack/assets/images/nightsky.jpeg');

const Welcome = () => {

    const navigation = useNavigation();

    // const northStar = () => {
    //     navigation.navigate("NorthStar");
    // }
    const map = () => {
        navigation.navigate("map");
    }
    const testFeature = () => {
        navigation.navigate("SensorTest");
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={PlaceholderImage} style={styles.image} />
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>North Star Navigation</Text> 
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.startButton} onPress={map}>
                        <MaterialCommunityIcons name="star-shooting-outline" size={24} color="black" />
                        <Text>Find North Star</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={testFeature}>
                        <Text style={styles.login}>Test Sensors</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    nameContainer: {
        marginTop: "-75%"
    },
    name: {
        color: 'white',
        marginTop: 0,
        fontSize: 36,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: "60%"
    },
    imageContainer: {
        flex: 1,
        paddingTop: 0,
    },
    image: {
        width: 400,
        height: 900,
        borderRadius: 18,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    startButton: {
        backgroundColor: 'white',
        width: 280,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    login: {
        fontSize: 16,
        color: 'white',
    },
    loginButton: {
        marginTop: 10,
        backgroundColor: 'none',
        width: 280,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 2,
        borderColor: 'white'
    }
})