import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../styles/colors'
import { StatusBar } from 'react-native'
import {Header} from '../components'
import { color } from 'react-native-reanimated'
import {fetchDiscoverMovies} from '../services/requests'
import {homeStyles} from '../styles'
import {ListComponent} from '../components'

export default class Home extends Component {
    state={
        data:[]
    }

   async componentDidMount(){

       const list= await fetchDiscoverMovies();
       this.setState({data:[...list.results]})
    }

    render() {
        return (
            <View style={{backgroundColor:Colors.mainBackgroundColor,flex:1}}>
                <StatusBar backgroundColor={Colors.mainBackgroundColor} />
                <Header />
                <ListComponent mainTitle='Trend Movies' allData={this.state.data} />
            </View>
        )
    }
}
