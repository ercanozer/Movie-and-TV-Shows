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
import { AdMobBanner } from 'react-native-admob'


export default class Home extends Component {
    state = {
        trendMovies: [],
        trendTvShows: [],
        netflixTvShow: [],
        amazonTvShow: [],
        errorStatus: false,
        adShow: false

    }

    async componentDidMount() {
        const listMovie = await fetchTrendMovies();
        const listTvShow = await fetchTrendTv();

        const netflixTvShow = await fetchDiscoverTvOrMovie('tv', '213');
        const amazonTvShow = await fetchDiscoverTvOrMovie('tv', '1024');
        if (listMovie != undefined) {
            this.setState({
                trendMovies: [...listMovie.results],
                trendTvShows: [...listTvShow.results],
                netflixTvShow: netflixTvShow.results
                , amazonTvShow: amazonTvShow.results
            })
        }
        else {
            this.setState({ errorStatus: true })
        }

    }

    render() {

        return (
            <View style={{ backgroundColor: Colors.mainBackgroundColor, flex: 1 }}>
                <Header />
                <StatusBar backgroundColor={Colors.mainBackgroundColor} />
                <ScrollView removeClippedSubviews={true}>

                    <ListComponent error={this.state.errorStatus} mainTitle='Trending Movies' navigation={this.props.navigation} allData={this.state.trendMovies} media_type="movie" />
                    <NativeAds showAd={this.state.adShow} changeShowState={() => this.setState({ adShow: true })} />
                    <ListComponent error={this.state.errorStatus} mainTitle='Trending TV shows' navigation={this.props.navigation} allData={this.state.trendTvShows} media_type="tv" />
                    <ListComponent error={this.state.errorStatus} mainTitle='Netflix TV shows' navigation={this.props.navigation} allData={this.state.netflixTvShow} media_type="tv" />
                    <View style={{ alignSelf: 'center', marginTop: 15 }}>

                        <AdMobBanner

                            adSize="banner"
                            adUnitID="ca-app-pub-2852605001804865/4077512741"
                            onAdFailedToLoad={error => console.error(error)}
                        />
                    </View>
                    <ListComponent error={this.state.errorStatus} mainTitle='Amazon TV shows' navigation={this.props.navigation} allData={this.state.amazonTvShow} media_type="tv" />


                </ScrollView>



            </View>
        )
    }
}
