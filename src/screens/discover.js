import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {colors} from '../styles'
export default class Discover extends Component {
    render() {
        return (
            <View style={{backgroundColor:colors.mainBackgroundColor,flex:1}}>
                <Text style={{color:'white',fontSize:35,fontWeight:'bold'}}> Discover </Text>
            </View>
        )
    }
}
