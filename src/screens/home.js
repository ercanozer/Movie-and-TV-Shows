import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import Colors from '../styles/colors'
import { StatusBar } from 'react-native'
import { Header, NativeAds } from '../components'
import { color } from 'react-native-reanimated'
import { fetchTrendMovies, fetchTrendTv, fetchDiscoverTvOrMovie } from '../services/requests'
import { homeStyles, colors, windowHeight } from '../styles'
import { ListComponent } from '../components'
import InView from 'react-native-component-inview'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';


export default class Home extends Component {
    state = {
        trendMovies: [],
        trendTvShows: [],
        netflixTvShow: [],
        amazonTvShow: [],
        errorStatus:false,
        adShow:false

    }

    async componentDidMount() {
        const listMovie = await fetchTrendMovies();
        const listTvShow = await fetchTrendTv();
        console.log(listMovie,'asdasdasda')
        const netflixTvShow = await fetchDiscoverTvOrMovie('tv', '213');
        const amazonTvShow = await fetchDiscoverTvOrMovie('tv', '1024');
        if(listMovie!=undefined){
            this.setState({
            trendMovies: [...listMovie.results],
            trendTvShows: [...listTvShow.results],
            netflixTvShow: netflixTvShow.results
            , amazonTvShow: amazonTvShow.results
        })
        }
        else{
            this.setState({errorStatus:true})
        }
        
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.mainBackgroundColor, flex: 1 }}>
                <Header />
                <StatusBar backgroundColor={Colors.mainBackgroundColor} />
                <ScrollView removeClippedSubviews={true}>

                   <ListComponent error={this.state.errorStatus} mainTitle='Trending Movies' navigation={this.props.navigation} allData={this.state.trendMovies} />
                 <NativeAds showAd={this.state.adShow} changeShowState={()=>this.setState({adShow:true})} />
                    <ListComponent error={this.state.errorStatus} mainTitle='Trending TV shows' navigation={this.props.navigation} allData={this.state.trendTvShows} />
                    <ListComponent error={this.state.errorStatus} mainTitle='Netflix TV shows' navigation={this.props.navigation} allData={this.state.netflixTvShow} />
                    <ListComponent error={this.state.errorStatus} mainTitle='Amazon TV shows' navigation={this.props.navigation} allData={this.state.amazonTvShow} />

            
                </ScrollView>



            </View>
        )
    }
}
