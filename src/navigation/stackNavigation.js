import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './bottomTabNav'
const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name='Movie Library' component={BottomTab} />
        </Stack.Navigator>)
}

export default StackNavigation;