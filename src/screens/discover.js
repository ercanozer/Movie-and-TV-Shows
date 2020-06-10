import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Animated, FlatList, Image } from 'react-native'
import { colors } from '../styles'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler'
import { fetchGenres } from '../services/requests'


const MAX_HEIGHT = 200
const MIN_HEIGHT = 105

const TopCategories = [{ name: 'Movies', imageURL: 'https://images8.alphacoders.com/100/thumb-1920-1003220.png', id: 'movie' }
    , { name: 'TV Shows', id: 'tv', imageURL: 'https://images2.alphacoders.com/879/thumb-1920-879599.png' }
    , { id: 'person', name: 'People', imageURL: 'https://images5.alphacoders.com/487/thumb-1920-487823.jpg' }]

export default class Discover extends Component {
    state = {
        offsetY: new Animated.Value(0),
        genresMovie: [],
        genresTV: []
    }

    async  componentDidMount() {
        const listMovie = await fetchGenres('movie');
        const listTv = await fetchGenres('tv');

        this.setState({
            genresMovie: [...listMovie],
            genresTV: [...listTv]
        })
    }

    render() {

        const headerY = this.state.offsetY.interpolate({
            inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
            outputRange: [0, -78],
            extrapolateRight: 'clamp'
        })
        const rotateX = this.state.offsetY.interpolate({
            inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
            outputRange: ['0deg', '160deg']
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
                    <SearchComponent />
                </Animated.View>

                <Animated.ScrollView
                    scrollEventThrottle={16}
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
                    <View style={{ paddingTop: MAX_HEIGHT - 50 }}>
                        <Text style={{color:'red',fontWeight:'700',right:10,fontSize:14,alignSelf:'flex-end',marginBottom:9}}>Discover by filters</Text>
                        <Text style={{ color: 'white', alignSelf: "center", fontSize: 23, marginBottom: 20, fontFamily: 'sans-serif-medium' }}>Top Categories</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 40 }}>
                            {TopCategories.map((item, index) => <TopItem name={item.name} imageURL={item.imageURL} />)}

                        </View>

                        <GenresComponent mainTitle='Movie Genres' allData={this.state.genresMovie} />
                        <GenresComponent mainTitle='TV Show Genres' allData={this.state.genresTV} />
                    </View>
                </Animated.ScrollView>
            </View>
        )
    }
}

const SearchComponent = () => {

    return (
        <TouchableOpacity activeOpacity={0.7} style={{
            width: Dimensions.get('window').width / 1.1,
            backgroundColor: 'white', borderRadius: 23, flexDirection: 'row', alignItems: 'center'
        }}>
            <FontAwesome5Icon style={{ padding: 7 }} name='sistrix' color='black' size={27} />
            <Text style={{ marginLeft: 8, color: 'gray' }}>Search Movie , TV show or Person</Text>
        </TouchableOpacity>
    )
}

const GenresComponent = ({ mainTitle, allData }) => {

    return (
        <View style={{ width: '100%', padding: 8, alignItems: 'flex-start', marginBottom: 40 }}>
            <Text style={{ color: 'white', fontSize: 22, marginBottom: 17, fontFamily: "sans-serif-medium" }}>{mainTitle}</Text>
            <GenresList listData={allData} />
        </View>
    )
}

const GenresList = ({ listData, navigation }) => {
    console.log(listData, "asddddddddddddddddddddd")

    return (
        <FlatList style={{ width: '100%' }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <ListItem navigation={navigation} key={index} title={item.name} />} />
    )
}

const ListItem = ({ title, navigation }) => {

    return (
        <TouchableOpacity style={{
            flexDirection: 'row', justifyContent: 'flex-start', width: null, alignItems: 'center'
            , backgroundColor: '#69779b', paddingLeft: 8, paddingRight: 8, borderRadius: 40, marginRight: 6
        }}>
            <Text style={{ color: '#e6f5ff', marginRight: 6, fontSize: 15, paddingBottom: 2 }}>{title}</Text>
            <FontAwesome5Icon style={{}} name='angle-right' size={25} color='lightblue' />
        </TouchableOpacity>
    )
}

const TopItem = ({ name, imageURL }) => {

    return (
        <TouchableOpacity activeOpacity={0.6}>

            <View style={{
                borderRadius: 15, width: Dimensions.get('screen').width / 2.2,
                aspectRatio: 1.8,
                alignSelf: 'center',
                overflow: 'hidden'
                , marginBottom: 15,
                justifyContent: 'center'
            }}>
                <Image style={{ width: '100%', height: '100%' }} resizeMode='center' source={{ uri: imageURL }} />
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.4, position: 'absolute', }}></View>
                <Text style={{ position: 'absolute', alignSelf: 'center', fontSize: 18, color: 'white', fontFamily: 'sans-serif-medium' }}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}