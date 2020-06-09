import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {headerStyles} from '../styles'


export class Header extends Component {
    render() {
        return (
            <View style={headerStyles.mainHeader}>
                <Text style={headerStyles.headerText}>movietime</Text>
            </View>
        )
    }   
}

export default Header
