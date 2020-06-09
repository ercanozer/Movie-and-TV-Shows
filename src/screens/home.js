import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Colors from '../styles/colors'
import { StatusBar } from 'react-native'
import { Header } from '../components'
import { color } from 'react-native-reanimated'
import { fetchTrendMovies,fetchTrendTv } from '../services/requests'
import { homeStyles } from '../styles'
import { ListComponent } from '../components'

export default class Home extends Component {
    state = { 
            trendMovies:[],
            trendTvShows:[]   
    }

    async componentDidMount() {
        const listMovie = await fetchTrendMovies();
        const listTvShow = await fetchTrendTv();
        this.setState({trendMovies:[...listMovie.results],trendTvShows:[...listTvShow.results]})
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.mainBackgroundColor, flex: 1 }}>
                <Header />
                <StatusBar backgroundColor={Colors.mainBackgroundColor} />
                <ScrollView>
                    <ListComponent mainTitle='Trending Movies' navigation={this.props.navigation}  allData={this.state.trendMovies} />                   
                    <ListComponent mainTitle='Trending TV shows' navigation={this.props.navigation} allData={this.state.trendTvShows} />                   
                    
                </ScrollView>



            </View>
        )
    }
}
