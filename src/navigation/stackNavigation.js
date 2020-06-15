import React, { Component } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import BottomTab from './bottomTabNav'
import {DetailScreen} from '../screens'
const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} headerMode={"none"}>
            <Stack.Screen name='Movie Library' component={BottomTab} />
            <Stack.Screen name='Detail Screen' component={DetailScreen} />
        </Stack.Navigator>)
}

export default StackNavigation;