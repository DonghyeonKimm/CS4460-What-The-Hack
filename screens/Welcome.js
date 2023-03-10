import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'; 
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

const PlaceholderImage = require('./assets/images/nightsky.jpeg');

const Welcome = () => {

    const home = () => {
        navigation.navigate("Home");
    }

    const login = () => {
        navigation.navigate("Login");
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={PlaceholderImage} style={styles.image} />
        </View>
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.startButton} onPress={home}>
                <MaterialCommunityIcons name="star-shooting-outline" size={24} color="black" />
                <Text>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={login}>
                <Text style={styles.login}>Log In</Text>
            </TouchableOpacity>
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