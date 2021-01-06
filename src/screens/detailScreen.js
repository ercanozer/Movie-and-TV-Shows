import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, Alert, Animated, ActivityIndicator, AsyncStorage, BackHandler } from 'react-native'
import { colors } from '../styles'
import { SliderBox } from 'react-native-image-slider-box'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { fetchDetail, fetchCast } from '../services/requests'
import { SvgUri, SvgCssUri, SvgXml } from 'react-native-svg'
import TypeWirter from 'react-native-typewriter'
import { TabView } from '../components'
import { color } from 'react-native-reanimated'
import shortid from 'shortid'
import { windowHeight } from '../styles'
import { saveToStorage, removeItemFromStorage } from '../utilities/saveFavorite'
import SvgVoteIcon from '../components/icons/VoteIcon'
import { CommonActions } from '@react-navigation/native'
import {Values} from '../utilities/detailInfoTransporter'
import FastImage from 'react-native-fast-image'



export default class DetailScreen extends Component {

    state = {
        backDrops: [],
        image: '',
        allData: {},
        offset: new Animated.Value(0),
        detailInfo: [],
        cast: [],
        enabled: true,
        loading: true,
        scrollHeight: 5000,
        isFavorite: false,

    }

    
    routes =Values.params;
    async componentDidMount() {
    
       console.log("calistizxxxxxxxxxxxxxxxxxxxxxxxxxx",Values.params)
 
        const keys = await AsyncStorage.getAllKeys();
        if (keys.includes(Values.params.id.toString())) this.setState({ isFavorite: true })
        const allData = await fetchDetail(Values.params.media_type, Values.params.id);
        const castData = await fetchCast(Values.params.media_type, Values.params.id);
        var images = [];
        images.push('http://image.tmdb.org/t/p/original' + allData.backdrop_path)
        allData.images.backdrops.forEach((element, index) => {

            if (index <= 5) {

                images[index + 1] = 'http://image.tmdb.org/t/p/original' + element.file_path;
            }


        });
        const { budget = '',
            original_language = 'en',
            revenue = '-',
            episode_run_time = [''],
            runtime = '',
            production_companies = '',
            seasons = [],

        } = allData;
        var infos = [];
        infos.push(...[{ 'Original Title': Values.params.name }, { Budget: budget }, { 'Original Language': original_language }, { revenue }, { Runtime: episode_run_time[0] }, { Runtime: runtime }, { production_companies }, { Seasons: seasons.length },])

    
        this.setState({ cast: castData, allData, backDrops: [...images], image: 'http://image.tmdb.org/t/p/original' + Values.params.imageUrl, detailInfo: infos, loading: false })


    }

    changeFavorite = (type) => {

    
        if (type == 'add') {
            console.log(Values.params.name,"bokbobkobkbokboobkobkb")

            saveToStorage(this.state.allData.id, Values.params.name, Values.params.media_type, Values.params.imageUrl).then(res => {

                this.setState({ isFavorite: true })
            }).catch(res =>res)
        } else {
            removeItemFromStorage(this.state.allData.id)
            this.setState({ isFavorite: false })
        }

    }

    backHandler=()=>{
        this.props.navigation.goBack()
        
          
    }




    render() {
      
        return (
            !this.state.loading ? <View onLayout={({ nativeEvent }) => this.setState({ scrollHeight: nativeEvent.layout.height })}
                style={styles.mainContainer}>

                <BackIcon goBack={this.backHandler} name={Values.params.name} height={this.state.offset} />

                <Animated.ScrollView
                    contentContainerStyle={{ top: 50 }}
                    stickyHeaderIndices={[1]}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { y: this.state.offset },
                                },
                            },
                        ],
                        { useNativeDriver: false }
                    )}>

                    <View style={{ height: windowHeight / 1.8 }}>
                        <BackGroundView images={this.state.backDrops} />
                        <MainInformation
                            isFavorite={this.state.isFavorite}
                            addFavorite={this.changeFavorite}
                            voteAvarage={this.state.allData.vote_average}
                            voteCount={this.state.allData.vote_count}
                            relaseDate={Values.params.media_type != 'tv' ? this.state.allData.release_date : this.state.allData.first_air_date}
                            status={this.state.allData.status}
                            uri={this.state.image}
                            name={Values.params.name} />
                    </View>

            
                    <View
                        style={{ paddingBottom: 50}} >
                        <TabView
                            id={this.state.allData.id}
                            media_type={Values.params.media_type}
                            navigation={this.props.navigation}
                            cast={this.state.cast}
                            setEnabled={() => this.setState({ enabled: !this.state.enabled })}
                            detailInfo={this.state.detailInfo}
                            genres={this.state.allData.genres}
                            overview={this.state.allData.overview}
                            offset={this.state.offset}
                            scrollHeight={this.state.scrollHeight}
                        />
                    </View>
                </Animated.ScrollView >
            </View> : <View style={{ backgroundColor: colors.mainBackgroundColor, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={50} color='white' />
                </View>
        )
    }
}


const MainInformation = ({ uri, name, relaseDate = '', status, voteAvarage = '', voteCount = '', addFavorite, isFavorite }) => {

    return (
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%', padding: 10, justifyContent: 'flex-start' }}>
            <View style={{
                padding: 7, height: windowHeight / 7.2, translateY: -windowHeight / 4.2 / 2
            }}>

                <FastImage resizeMode='cover' source={uri ? { uri: uri } : null} style={{ borderRadius: 25, borderColor: 'white', borderWidth: 1.5, width: Dimensions.get('window').width / 3.7, height: windowHeight / 4.2 }} />
            </View>
            <View  style={{ width: '60%', alignSelf: 'flex-start', paddingHorizontal: 18 }}>
                <Text numberOfLines={2} style={{ fontSize: 21, color: 'white', alignSelf: 'flex-start', fontFamily: 'sans-serif-medium' }}>{name}</Text>
                {relaseDate != '' && <Text typing={1} style={{ marginTop: 8, fontSize: 13, color: 'gray', alignSelf: 'flex-start', fontFamily: 'sans-serif-medium' }}>{relaseDate.split('-')[0]}  |  {status}</Text>
                }
            </View>
            <TmdbLogo isFavorite={isFavorite} addFavorite={addFavorite} voteAvarage={voteAvarage} voteCount={voteCount} />
        </View>
    )
}

const TmdbLogo = ({ voteAvarage, voteCount, addFavorite, isFavorite }) => {

    return (
        <View style={{ padding: 7, flexDirection: 'row', width: '100%' }}>
            <View style={{ backgroundColor: 'black', borderRadius: 18, padding: 9 }} >

                <SvgVoteIcon />
            </View>
            <View style={{ marginLeft: 7 }}>
                <Text style={{ fontSize: 17, color: 'white', alignSelf: 'flex-start', fontFamily: 'sans-serif-medium' }}>{voteAvarage.toString().split('.').join('')}%</Text>
                <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'center' }}>
                    <Text typing={1} maxDelay={10} style={{ marginRight: 4, fontSize: 12, color: 'gray', alignSelf: 'flex-start', fontFamily: 'sans-serif-medium' }}>{voteCount.toString()}</Text>
                    <FontAwesome5Icon name='user-friends' color='gray' size={12} />
                </View>
            </View>
            <AddListIcon isFavorite={isFavorite} addFavorite={addFavorite} />
        </View>
    )
}

const AddListIcon = ({ state = false, addFavorite, isFavorite }) => {
    return (
        <TouchableOpacity onPress={() => addFavorite(isFavorite ? 'remove' : 'add')} style={{ position: 'absolute', right: 20, bottom: 10 }}>
            <FontAwesome5Icon name='bookmark' solid={isFavorite ? true : false} color='#32e0c4' size={42} />

        </TouchableOpacity>
    )
}

class BackIcon extends Component {

    render() {

        return (
            <Animated.View style={{
                zIndex: 900,
                position: 'absolute',
                flexDirection: 'row',
                width: '100%',
                height: 70,
            }}>
                <FontAwesome5Icon style={{ padding: 9, position: 'absolute' }} color='white' name='chevron-left' size={29} />
                <Animated.View style={{
                    backgroundColor: colors.mainBackgroundColor,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',

                    height: 50,
                }}>
                    <TouchableOpacity onPress={this.props.goBack} >
                        <FontAwesome5Icon style={{ padding: 7 }} color='white' name='chevron-left' size={29} />
                    </TouchableOpacity>
                    <Text
                        style={{ marginLeft: 10, fontSize: 19, color: 'white', fontFamily: 'sans-serif-medium' }}>{this.props.name}</Text>

                </Animated.View>
            </Animated.View>
        )
    }
}

const BackGroundView = ({ images }) => {
    return <View style={{ height: windowHeight / 3.4 }}>

        <SliderBox resizeMode='cover' dotColor="white"
            inactiveDotColor="gray" dotStyle={{ width: 8, height: 8 }} paginationBoxStyle={{

                alignSelf: "flex-end",
                justifyContent: "center",
                alignItems: 'flex-end',

            }} sliderBoxHeight={windowHeight / 3.4} images={images} />
    </View>
}



const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.mainBackgroundColor
    },
    backIcon: {
        zIndex: 200,
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    }, container: {

        height: null,
        marginTop: 0
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});



