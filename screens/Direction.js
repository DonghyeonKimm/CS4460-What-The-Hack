import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Compass from '../components/Compass';

const Direction = () => {
    const [north, setNorth] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.prompt}>
                <Text style={styles.promptText}> First You Need To Point Your Phone In The North Direction</Text>
                <Text style={styles.promptText}> Find The Direction That Makes The 'N' Green</Text>
            </View>
            <View style={styles.compass}>
                <Compass />
            </View>
        </View>
    )
}

export default Direction

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        alignItems: 'center'
    },
    promptText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
})