import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Calorie Tracker!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});
