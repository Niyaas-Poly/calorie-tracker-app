import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ManageFoodScreen({ route, navigation, setFoodList }) {
    const { isEditing, foodItem } = route.params || {};
    const [name, setName] = useState(isEditing ? foodItem.name : '');
    const [calories, setCalories] = useState(isEditing ? foodItem.calories.toString() : '');

    const handleSave = () => {
        if (!name || !calories) {
            Alert.alert('Error', 'Please enter both a food name and calories.');
            return;
        }

        const newItem = {
            id: isEditing ? foodItem.id : Date.now().toString(),
            name,
            calories: parseInt(calories),
        };

        setFoodList((prevList) =>
            isEditing
                ? prevList.map((item) => (item.id === foodItem.id ? newItem : item))
                : [...prevList, newItem]
        );

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Food Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Calories"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
            />
            <Button title={isEditing ? 'Edit Food Item' : 'Add Food Item'} onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
});
