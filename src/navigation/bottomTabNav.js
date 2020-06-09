import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Home,Discover,Favorite} from '../screens'
import {bottomTabStyle} from '../styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Text, Button } from 'react-native'

const Tab = createBottomTabNavigator();

const TabIcon=({focused,iconName})=>{
     return (<FontAwesome5 solid={false} color={focused==true ? 'red':'gray'} name={iconName} size={21} />)
};

const BottomTab = () => {

    return (
        <Tab.Navigator  tabBarOptions={{labelStyle:bottomTabStyle.labelStyle,style:bottomTabStyle.style}}>
            <Tab.Screen options={{tabBarIcon:({focused})=><TabIcon focused={focused} iconName='house-damage' />,tabBarLabel:(props)=><Text style={[bottomTabStyle.labelStyle,{color:props.focused==true?'white':'gray'}]} >Home</Text> }} name='Home' component={Home} />
            <Tab.Screen options={{tabBarIcon:({focused})=><TabIcon focused={focused} iconName='phoenix-squadron' />,tabBarLabel:(props)=><Text style={[bottomTabStyle.labelStyle,{color:props.focused==true?'white':'gray'}]} >Discover</Text>}} name='Discover' component={Discover} />
            <Tab.Screen options={{tabBarIcon:({focused})=><TabIcon focused={focused} iconName='heart' />,tabBarLabel:(props)=><Text style={[bottomTabStyle.labelStyle,{color:props.focused==true?'white':'gray'}]} >Watch List</Text>}} name='Favorite' component={Favorite} />
        </Tab.Navigator>
    )

}
export default BottomTab;