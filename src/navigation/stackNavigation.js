import React, { Component } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import BottomTab from './bottomTabNav'
import {DetailScreen} from '../screens'
import {SearchView} from '../components'
const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator  headerMode={"none"}>
            <Stack.Screen name='Movie Library' component={BottomTab} />
            <Stack.Screen name='Detail Screen' component={DetailScreen} />
            <Stack.Screen options={{cardStyleInterpolator:CardStyleInterpolators.forModalPresentationIOS}} name='Search Screen' component={SearchView} />
        </Stack.Navigator>)
}

export default StackNavigation;