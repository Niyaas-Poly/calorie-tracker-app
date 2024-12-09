import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { ProgressBar, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

export default function HomeScreen({ navigation, foodList, setFoodList, calorieGoal }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [snackVisible, setSnackVisible] = useState(false);
    const [lastDeletedItem, setLastDeletedItem] = useState(null);

    // Calculate total calories consumed
    const totalCalories = foodList.reduce((sum, item) => sum + item.calories, 0);

    // Handle deletion of food items
    const deleteFoodItem = (id) => {
        const itemToDelete = foodList.find((item) => item.id === id);
        setLastDeletedItem(itemToDelete);
        setFoodList(foodList.filter((item) => item.id !== id));
        setSnackVisible(true);
    };

    const undoDelete = () => {
        if (lastDeletedItem) {
            setFoodList((prevList) => [...prevList, lastDeletedItem]);
            setSnackVisible(false);
        }
    };

    const calculateSummary = () => {
        Alert.alert(
            'Calorie Summary',
            `Total Calories: ${totalCalories}\nCalorie Goal: ${calorieGoal}`
        );
    };

    const filteredList = foodList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Calorie Tracker */}
            <Text style={styles.header}>Calorie Tracker</Text>
            <ProgressBar
                progress={totalCalories / calorieGoal}
                color={totalCalories > calorieGoal ? 'red' : 'green'}
                style={styles.progressBar}
            />
            <Text style={[styles.tracker, { color: totalCalories > calorieGoal ? 'red' : 'green' }]}>
                {totalCalories} / {calorieGoal} kcal consumed
            </Text>

            {/* Search Bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search Food"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Food List */}
            <FlatList
                data={filteredList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Animatable.View animation="fadeIn" duration={500} style={styles.listItem}>
                        <Text style={styles.itemText}>
                            {item.name} - {item.calories} kcal
                        </Text>
                        <View style={styles.actionButtons}>
                            {/* Edit Button */}
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Manage Food', { isEditing: true, foodItem: item })}
                                style={styles.editButton}
                            >
                                <Icon name="edit" size={20} color="#fff" />
                            </TouchableOpacity>
                            {/* Delete Button */}
                            <TouchableOpacity
                                onPress={() => deleteFoodItem(item.id)}
                                style={styles.deleteButton}
                            >
                                <Icon name="delete" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                )}
            />

            {/* Buttons for Actions */}
            <View style={styles.buttons}>
                <Button
                    title="Add Food"
                    onPress={() => navigation.navigate('Manage Food', { isEditing: false })}
                />
                <Button title="View Summary" onPress={calculateSummary} />
            </View>

            {/* Snackbar for Undo Delete */}
            <Snackbar
                visible={snackVisible}
                onDismiss={() => setSnackVisible(false)}
                action={{
                    label: 'Undo',
                    onPress: undoDelete,
                }}
            >
                Food item deleted.
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    progressBar: {
        height: 20,
        borderRadius: 10,
        marginVertical: 10,
    },
    tracker: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#ff5252',
        padding: 8,
        borderRadius: 5,
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
