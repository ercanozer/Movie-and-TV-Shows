import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {headerStyles} from '../styles'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


export class Header extends Component {
    render() {
        return (
            <View style={headerStyles.mainHeader}>
                <Text style={headerStyles.headerText}>MovieTime</Text>
               
            </View>
        )
    }   
}


export default Header
