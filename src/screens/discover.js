import React, { Component, useState } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Animated, FlatList, Image } from 'react-native'
import { colors } from '../styles'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler'
import { fetchGenres } from '../services/requests'
import { GenresComponent, SearchView } from '../components'
import {routeToDiscovery} from '../utilities/categoryRouter'
import {
    AdMobBanner,
} from 'react-native-admob'
import { genresLists } from '../utilities/genresData'
import FastImage from 'react-native-fast-image'


const MAX_HEIGHT = 200
const MIN_HEIGHT = 105


const TopCategories = [{ name: 'Movies', imageURL: 'http://images8.alphacoders.com/100/thumb-1920-1003220.png', id: 'movie' }
    , { name: 'TV Shows', id: 'tv', imageURL: 'http://images2.alphacoders.com/879/thumb-1920-879599.png' }
    , { id: 'person', name: 'People', imageURL: 'http://images5.alphacoders.com/487/thumb-1920-487823.jpg' }]

export default class Discover extends Component {
    state = {
        offsetY: new Animated.Value(0),
        genresMovie: [],
        genresTV: []
    }

     componentDidMount() {

      
    }

    render() {
    

        const headerY = this.state.offsetY.interpolate({
            inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
            outputRange: [0, -78],
            extrapolateRight: 'clamp',
        })
        const rotateX = this.state.offsetY.interpolate({
            inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
            outputRange: ['0deg', '160deg'],
        })


        return (
            <View style={{ backgroundColor: colors.mainBackgroundColor, flex: 1, alignItems: 'center' }}>
                <Animated.View style={{ backgroundColor: colors.mainBackgroundColor, width: '100%', zIndex: 1000, height: null, overflow: 'hidden', minHeight: 0, position: 'absolute', translateY: headerY, alignItems: 'center', paddingBottom: 7 }}>

                    <Animated.Text style={{
                        transform: [{ rotateX: rotateX }],
                        margin: 10, color: 'white',
                        fontSize: 40,
                        fontWeight: 'bold',
                        padding: 8,
                        height: null,
                        overflow: 'hidden'
                    }}> Discover </Animated.Text>
                    <SearchComponent openSearch={() => this.props.navigation.navigate('Search Screen')} />
                </Animated.View>

                <Animated.ScrollView

                    style={{ width: '100%', flex: 1 }}

                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { y: this.state.offsetY }
                                }
                            }
                        ],
                        { useNativeDriver: true } // <-- Add this
                    )} >
                    <View style={{ paddingTop: MAX_HEIGHT - 40 }}>
                        <View style={{ width: null, alignItems: 'center', alignSelf: 'center' }}>
                            <AdMobBanner

                                adSize="banner"
                                adUnitID="ca-app-pub-2852605001804865/7760649331"
                                onAdFailedToLoad={error => console.error(error)}
                            />
                        </View>
                        <Text style={{ color: 'white', alignSelf: "center", fontSize: 23, marginBottom: 20, fontFamily: 'sans-serif-medium',marginTop:17 }}>Top Categories</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 40 }}>
                            {TopCategories.map((item, index) => <TopItem selectedTab={index} name={item.name} key={index.toString()} navigation={this.props.navigation} imageURL={item.imageURL} />)}

                        </View>

                        <GenresComponent mainTitle='Movie Genres' navigation={this.props.navigation} allData={genresLists.movieGenres} />
                        <View style={{ width: null, alignItems: 'center', alignSelf: 'center' }}>
                            <AdMobBanner

                                adSize="largeBanner"
                                adUnitID="ca-app-pub-2852605001804865/2508322659"
                                testDevices={[AdMobBanner.simulatorId]}
                                onAdFailedToLoad={error => console.error(error)}
                            />
                        </View>
                        <GenresComponent navigation={this.props.navigation} mainTitle='TV Show Genres' allData={genresLists.tvShowGenres} />
                    </View>
                </Animated.ScrollView>
            </View>
        )
    }
}

const SearchComponent = ({ openSearch }) => {

    return (
        <TouchableOpacity onPress={openSearch} delayPressIn={0} delayPressOut={0} activeOpacity={1} style={{

            width: Dimensions.get('window').width / 1.1,
            backgroundColor: 'white', borderRadius: 23, flexDirection: 'row', alignItems: 'center'
        }}>
            <FontAwesome5Icon style={{ padding: 7 }} name='sistrix' color='black' size={27} />
            <Text style={{ marginLeft: 8, color: 'gray' }}>Search Movie , TV show or Person</Text>
        </TouchableOpacity>
    )
}



const TopItem = ({ name, imageURL,navigation,selectedTab }) => {

    return (
        <TouchableOpacity onPress={()=>{
            routeToDiscovery(navigation,name)
        }} style={{ elevation: 15, borderRadius: 9, marginBottom: 15 }} activeOpacity={0.6}>

            <View style={{
                borderRadius: 9, width: Dimensions.get('screen').width / 2.2,
                aspectRatio: 1.8,
                alignSelf: 'center',
                overflow: 'hidden',
                justifyContent: 'center'
            }}>
                <FastImage style={{ width: '100%', height: '100%' }} resizeMode='center' source={{ uri: imageURL }} />
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5, position: 'absolute', }}></View>
                <Text style={{ position: 'absolute', alignSelf: 'center', fontSize: 18, color: 'white', fontFamily: 'sans-serif-medium' }}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

