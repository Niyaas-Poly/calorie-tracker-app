import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ManageFoodScreen from './screens/ManageFoodScreen';

const Stack = createStackNavigator();

export default function App() {
    const [foodList, setFoodList] = useState([]);
    const calorieGoal = 2500; // Fixed calorie goal since settings are removed

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Home">
                    {(props) => (
                        <HomeScreen
                            {...props}
                            foodList={foodList}
                            setFoodList={setFoodList}
                            calorieGoal={calorieGoal}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Manage Food">
                    {(props) => <ManageFoodScreen {...props} setFoodList={setFoodList} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
