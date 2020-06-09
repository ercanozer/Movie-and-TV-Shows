import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {headerStyles} from '../styles'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


export class Header extends Component {
    render() {
        return (
            <View style={headerStyles.mainHeader}>
                <Text style={headerStyles.headerText}>MovieTime</Text>
               <Search />
            </View>
        )
    }   
}

const Search=()=>{

    return (
        <TouchableOpacity style={{width:40,aspectRatio:1,justifyContent:'center',alignItems:'center'}} >
             <FontAwesome5Icon name='sistrix' color='white'size={28} />
        </TouchableOpacity>
    )
}

export default Header
