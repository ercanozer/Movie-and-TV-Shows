import React, { Component, useState, useEffect, useRef } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, Image, ActivityIndicator, Animated, TextInput, LayoutAnimation, UIManager, DrawerLayoutAndroid, Modal, YellowBox } from 'react-native'
import MaterialTabs from 'react-native-material-tabs';
import { colors, windowHeight } from '../styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ActorComponent from './actorComponent';
import { fetchDiscoverTvOrMovieForFiltering, fetchSearchQuery } from '../services/requests';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import SvgVoteIcon from './icons/VoteIcon';
import RippleButton from 'react-native-material-ripple'
import { WheelePicker, FilterModals } from '.';
import MaterialRipple from 'react-native-material-ripple'
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SortData = [
    { text: 'Release Date', id: 'release_date' },
    { text: 'Popularity', id: 'popularity' },
    { text: 'Vote Avarage', id: 'vote_average' },
]

const SearchView = (props) => {
    const [numColumn, setNumColumn] = useState(3);
    const [data, setData] = useState({ 0: [], 1: [], 2: [] })
    const [selectedTab, setSelectedTab] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [filterState, setFilterState] = useState(false);
    const drawerRef = React.createRef();
    const [sortFilter, setSortFilter] = useState('popularity');
    const [sortType, setSortType] = useState('desc');
    const [filterMode, setFilterMode] = useState(null);
    const [selectedGenresIds, setSelectedGenresIds] = useState({ movie: [], tvShow: [] });
    const [genresState, setGenresState] = useState("movie");
    const [selectedDate, setSelectedDate] = useState(2019)
    const [selectedAvareges, setSelectedAvareges] = useState({ min: 1, max: 9 })
    const [filtering, setFiltering] = useState(false)
    const [filterView, setFilterView] = useState(false)





    const changeLayout = () => {
        setNumColumn(() => numColumn == 2 ? 3 : 2)
    }

    const refreshData = () => {
        console.log("calisti")
        setPage(page + 1)
    }

    const changeText = async (query) => {
        setFiltering(false)
        if (query == '') {
            setData({ 0: [], 1: [], 2: [] })

        } else {

            fetchSearchQuery(query, 1).then(res1 => {
                fetchSearchQuery(query, 2).then(res2 => {
                    var array0 = (res1.results.filter((item, index) => item.media_type == 'movie')).push(res2.results.filter((item, index) => item.media_type == 'movie'));

                    setData(prevState => ({
                        ...prevState,
                        0: (res1.results.filter((item, index) => item.media_type == 'movie')).concat(res2.results.filter((item, index) => item.media_type == 'movie')),
                        1: (res1.results.filter((item, index) => item.media_type == 'tv')).concat(res2.results.filter((item, index) => item.media_type == 'tv')),
                        2: (res1.results.filter((item, index) => item.media_type == 'person')).concat(res2.results.filter((item, index) => item.media_type == 'person'))
                    }))
                })

            })

            setPage(3)
        }
        setQuery(query)


    }




    useEffect(() => {


        if (query == '' && !filtering) {

            setData({ 0: [], 1: [], 2: [] })

        } else {
            if (filtering) {
                async function proc() {
                    try {
                        var tvDataFromFiltering = await fetchDiscoverTvOrMovieForFiltering('tv', sortFilter, sortType, selectedGenresIds.tvShow, selectedDate, selectedAvareges)
                        var newData1 = tvDataFromFiltering.map((value) => ({ ...value, media_type: 'tv' }))
                        var movieDataFromFiltering = await fetchDiscoverTvOrMovieForFiltering('movie', sortFilter, sortType, selectedGenresIds.movie, selectedDate, selectedAvareges)
                        var newData2 = movieDataFromFiltering.map((value) => ({ ...value, media_type: 'movie' }))
                        console.log(newData2)
                        setData(oldData => ({
                            ...oldData,
                            0: oldData[0].concat(newData2.filter((item, index) => item.media_type == 'movie')),
                            1: oldData[1].concat(newData1.filter((item, index) => item.media_type == 'tv')), 2: []
                        }))
                        drawerRef.current.closeDrawer()
                    } catch (error) {
                        console.log(error)
                    }
                }
                proc()

            } else {


                fetchSearchQuery(query, page).then(res => {
                    if (res !== undefined) {
                        setData(prevState => {
                            var data1 = res.results.filter((item, index) => item.media_type == 'movie')
                            var data2 = res.results.filter((item, index) => item.media_type == 'tv')
                            var data3 = res.results.filter((item, index) => item.media_type == 'person')
                            if (selectedTab == 0 && data1.length < 3) {
                                console.log("bok")
                                refreshData()
                            }
                            if (selectedTab == 1 && data2.length < 3) {
                                refreshData()
                            }
                            if (selectedTab == 2 && data3.length < 3) {
                                refreshData()
                            }
                            return {
                                ...prevState,
                                0: prevState[0].concat(data1),
                                1: prevState[1].concat(data2),
                                2: prevState[2].concat(data3)
                            }
                        }

                        )
                    }

                }
                )
            }
        }


    }, [page])

    const changeProperties = (newValue, changeType) => {
        switch (changeType) {
            case 'setSortType': setSortType(newValue);
                break;

            case 'setSortFilter': setSortFilter(newValue);
                break;

            case 'setSortGenresType': setGenresState(newValue);
                break;

            case 'setGenresSelectedIdsMovie': {
                setSelectedGenresIds(oldArray => {
                    if (selectedGenresIds.movie.includes(newValue)) {
                        return { ...oldArray, movie: oldArray.movie.filter(item => item != newValue) }
                    }
                    else {
                        return { ...oldArray, movie: [...oldArray.movie, newValue] }
                    }

                }
                )

            }
                break;
            case 'setGenresSelectedIdsTv': {
                setSelectedGenresIds(oldArray => {
                    if (selectedGenresIds.tvShow.includes(newValue)) {
                        return { ...oldArray, tvShow: oldArray.tvShow.filter(item => item != newValue) }
                    }
                    else {
                        return { ...oldArray, tvShow: [...oldArray.tvShow, newValue] }
                    }

                }
                )

            }
                break;

            case 'setYear': {
                setSelectedDate(newValue)
            }
                break;

            case 'setMinAvarege': {

                if (newValue <= selectedAvareges.max)
                    setSelectedAvareges({ ...selectedAvareges, min: newValue })
                break;
            }
            case 'setMaxAvarege': {

                if (!newValue < selectedAvareges.min)
                    setSelectedAvareges({ ...selectedAvareges, max: newValue })
                break;
            }




        }
    }
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
    const changeFilterMode = (newMode) => {
        setFilterMode(newMode)
    }

    const searchWithFilter = async () => {
        try {
            setData({ 0: [], 1: [], 2: [] })
            var tvDataFromFiltering = await fetchDiscoverTvOrMovieForFiltering('tv', sortFilter, sortType, selectedGenresIds.tvShow, selectedDate, selectedAvareges)
            var newData1 = tvDataFromFiltering.map((value) => ({ ...value, media_type: 'tv' }))
            var movieDataFromFiltering = await fetchDiscoverTvOrMovieForFiltering('movie', sortFilter, sortType, selectedGenresIds.tvShow, selectedDate, selectedAvareges)
            var newData2 = movieDataFromFiltering.map((value) => ({ ...value, media_type: 'movie' }))

            setData({ 0: newData2, 1: newData1, 2: [] })
            setFilterView(!filterView)
            setFiltering(true)

        } catch (error) {
            console.log(error)
        }

    }

    return (



        <Animated.View style={{ flex: 1, width: '100%', backgroundColor: colors.mainBackgroundColor }}>
            {filterView && <View style={{ height: '100%', width: '100%', position: 'absolute', bottom: 0, zIndex: 2000, backgroundColor: "rgba(35, 20, 20, 0.76)", }}>
                <View style={{ height: '45%', width: '100%', position: 'absolute', bottom: 0, backgroundColor: "#1e5f74", padding: 6, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 4 }} >

                    <ScrollView >
                        <SearchFilter
                            sortBySelectedText={sortType}
                            selectedDate={selectedDate}
                            sortBySelectedId={sortFilter}
                            changeProperties={changeProperties}
                            selectedAvareges={selectedAvareges}
                            type={filterMode}
                            setFilterMode={changeFilterMode}
                            contentData={'example'}
                            genresState={genresState}
                            closeFilter={() => setFilterView(!filterView)}
                            genresSelectedItems={selectedGenresIds}
                            searchWithFilter={searchWithFilter}

                        />
                    </ScrollView>
                </View>

            </View>}



            <Animated.View style={{ backgroundColor: '#222831' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6, justifyContent: 'space-around', paddingRight: 15, paddingLeft: 13 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <FontAwesome5Icon onPress={() => props.navigation.goBack()} style={{ marginLeft: 2, paddingRight: 7 }} color='white' name='chevron-left' size={29} />
                    </TouchableOpacity>

                    <TextInput
                        onChangeText={changeText}

                        placeholder='Search...' placeholderTextColor='gray' style={{ width: '80%', fontSize: 17.3, color: 'white', marginLeft: 12 }} />
                    <ToggleButton onClick={() => setFilterView(!filterView)} />
                    <TouchableOpacity delayPressOut={0} activeOpacity={0.6} onPress={changeLayout}>
                        <FontAwesome5Icon style={{ marginLeft: 0 }} color='white' name={numColumn == 2 ? 'th-list' : 'th'} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignSelf: 'center' }}>

                    <MaterialTabs
                        textStyle={{ fontFamily: 'sans-serif-medium', fontSize: 13 }}
                        items={['Movies', 'TV Shows', 'People']}
                        selectedIndex={selectedTab}
                        activeTextStyle={{ color: 'red', }}
                        onChange={setSelectedTab}
                        barColor='#222831'
                        indicatorColor="red"
                        activeTextColor="white"
                    />


                </View>
                <View style={{ backgroundColor: colors.mainBackgroundColor }}>

                    {query != '' || filtering ?
                        <FlatList
                            key={selectedTab == 2 ? 1 : numColumn != 2 ? 3 : 1}
                            style={{ width: '100%', paddingTop: 10, marginBottom: 250 }}
                            keyExtractor={(item, index) => index}
                            data={data[selectedTab]}
                            numColumns={selectedTab == 2 ? 1 : numColumn != 2 ? 3 : 1}
                            contentContainerStyle={{ alignItems: 'flex-start' }}
                            onEndReached={refreshData}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={<ActivityIndicator color='white' size={40} />}
                            ListFooterComponentStyle={{ alignSelf: 'center', margin: 10 }}
                            renderItem={({ item, index }) => item.media_type == 'person' ? <CastComp key={index} path={item.profile_path} name={item.name} characterName={item.character} /> : numColumn != 2 ? <ListItem
                                id={item.id}
                                media_type={item.media_type}
                                navigation={props.navigation}
                                key={index}
                                title={item.media_type == 'movie' ? item.original_title : item.name}
                                imageURL={item.poster_path} /> : <SpreadItem id={item.id}
                                    media_type={item.media_type}
                                    navigation={props.navigation}
                                    key={index}
                                    title={item.media_type == 'movie' ? item.original_title : item.name}
                                    imageURL={item.poster_path}
                                    voteAvarage={item.vote_average}
                                    relaseDate={item.media_type == 'movie' ? item.release_date : item.first_air_date} />} /> : <View style={{ alignItems: 'center' }}><Text style={{ color: 'gray', fontSize: 30, alignSelf: 'center', marginTop: 20, marginBottom: 5, fontFamily: 'sans-serif-medium' }}>Search Something</Text><FontAwesome5Icon size={35} color='gray' name='search' /></View>}


                </View>

            </Animated.View>
        </Animated.View>

    )
}
const ListItem = React.memo( ({ title, imageURL, navigation, id, media_type }) => {

    return (
        <TouchableOpacity
            delayPressIn={2.50}
            style={{ width: Dimensions.get('window').width / 3.25, margin: 5 }} onPress={() => navigation.navigate('Detail Screen', { params: { id: id, media_type: media_type, imageUrl: imageURL, name: title } })} activeOpacity={0.8}>

            <View style={{ margin: 7 }}>
                <View style={{ elevation: 10 }}>
                    {imageURL != null ? <Image fadeDuration={0} resizeMode='cover' style={{ width: '100%', aspectRatio: 0.67, borderRadius: 10 }}
                        source={{ uri: 'https://image.tmdb.org/t/p/original' + imageURL }} /> : <FontAwesome5Icon style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', aspectRatio: 0.67, borderRadius: 10 }} name='camera' color='gray' size={40} />}

                </View>
                <Text numberOfLines={2} style={{ color: 'white', maxWidth: Dimensions.get('window').width / 3.25, padding: 2, fontSize: 13 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
})

const SpreadItem = ({ title, relaseDate, voteAvarage, id, imageURL, navigation, media_type }) => {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Detail Screen', { params: { id: id, media_type: media_type, imageUrl: imageURL, name: title } })} >

            <View style={{ flexDirection: 'row', justifyContent: "flex-start", width: Dimensions.get('window').width, margin: 10 }}>
                <View style={{ elevation: 10, width: Dimensions.get('window').width / 3.32 }}>
                    {imageURL != null ? <Image fadeDuration={0} resizeMode='cover' style={{ width: '100%', aspectRatio: 0.60, borderRadius: 10 }}
                        source={{ uri: 'https://image.tmdb.org/t/p/original' + imageURL }} /> : <FontAwesome5Icon style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', aspectRatio: 0.67, borderRadius: 10 }} name='camera' color='gray' size={40} />}
                </View>
                <View style={{ marginLeft: 14, flex: 1 }} >
                    <Text style={{ color: 'white', padding: 2, fontSize: 18, fontFamily: 'sans-serif-medium', paddingRight: 14 }}>{title}</Text>
                    <Text numberOfLines={1} style={{ color: 'gray', padding: 2, fontSize: 14, marginTop: 4 }}>{relaseDate != undefined && relaseDate.split('-')[0]}</Text>
                </View>
                <View style={{ flexDirection: "row", position: 'absolute', bottom: 5, right: 30, alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'black', borderRadius: 18, padding: 9, flexDirection: "row" }}>
                        <SvgVoteIcon />
                    </View>
                    <Text style={{ fontSize: 16, color: 'white', fontFamily: 'sans-serif-medium', marginLeft: 7 }}>{voteAvarage.toString().split('.').join('')}%</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const CastComp = ({ path, name, characterName }) => {

    return (
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignSelf: 'center', marginBottom: 30, }}>
            <ImageItem profilePath={path} />
            <View style={{ flexDirection: 'column', marginLeft: 16, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={{ color: 'gray', fontSize: 16 }}>{characterName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ImageItem = ({ profilePath }) => {
    return (

        <View style={styles.imageContainer}>
            <Image resizeMethod='auto' resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: profilePath != null ? 'https://image.tmdb.org/t/p/original' + profilePath : 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png' }} />
        </View>
    )
}

const ToggleButton = ({ onClick }) => {

    return (
        <RippleButton
            onPress={() => onClick()}
            style={{
                alignItems: 'center'
                , justifyContent: 'center', borderRadius: Dimensions.get('window').width / 6.4 / 2
                , width: Dimensions.get('window').width / 6.4, aspectRatio: 1, right: 7
            }}>
            <FontAwesome5Icon color='red' name='searchengin' size={25} />
        </RippleButton>
    )
}


const mainFilterData = [
    'Sort by',
    'Genres',
    'Date',
    'Vote Average'
]

const SearchFilter = ({ height, searchWithFilter, sortByData, closeFilter, selectedDate, selectedAvareges, sortBySelectedId, sortBySelectedText, changeProperties, type, setFilterMode, contentData, genresState, genresSelectedItems }) => {

    return (
        <View style={{ flex: 1 }}>
            {
                type != null ? <FilterModals
                    genresState={genresState}
                    genresSelectedItems={genresSelectedItems}
                    changeProperties={changeProperties}
                    type={type}
                    setFilterMode={setFilterMode}
                    selectedAvareges={selectedAvareges}
                    sortData={SortData}
                    sortByState={sortBySelectedText}
                    sortBySelectedId={sortBySelectedId}
                    selectedDate={selectedDate} />

                    : <View style={{ height: "90%", justifyContent: "flex-start" }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingRight: 14, paddingLeft: 14, marginTop: 10 }}>
                            <Text style={styles.drawerText}>Discover</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <FontAwesome5Icon onPress={() => searchWithFilter()} name='check' size={23} color='white' style={{ left: 5, right: 5, padding: 12 }} />
                                <FontAwesome5Icon name='times' onPress={() => closeFilter()} size={23} color='white' style={{ left: 5, right: 5, padding: 12 }} />
                            </View>


                        </View>
                        <View style={{ margin: 0, marginTop: 20 }}>
                            {mainFilterData.map((value, index) => <DrawerItem title={value} changeFilterMode={setFilterMode} key={index} content={contentData[value]} />)}
                        </View>


                    </View>

            }


        </View>

    )
}
const DrawerItem = ({ title, content, changeFilterMode }) => {

    return (
        <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: "center", borderBottomColor: '#fff', flexDirection: "row", borderBottomWidth: 0.25, marginTop: 15, paddingLeft: 14, paddingBottom: 15 }} onPress={() => changeFilterMode(title)} activeOpacity={0.8}>
            <Text style={[styles.drawerText, { fontSize: 19, color: 'white' }]}>{title}</Text>
            <FontAwesome5Icon name='arrow-right' size={22} color='#f2a365' style={{ right: 7 }} />
        </TouchableOpacity>

    )

}


const styles = StyleSheet.create({
    imageContainer: {
        marginLeft: 10,
        borderRadius: Dimensions.get('window').width / 10,
        overflow: 'hidden',
        width: Dimensions.get('window').width / 4.8,
        aspectRatio: 1,
        borderColor: 'lightblue',
        borderWidth: 1
    },
    nameText: {
        color: 'white',
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
        marginBottom: 4
    },
    drawerText: {
        color: 'white',
        fontFamily: 'sans-serif-medium',
        fontSize: 27,
        textAlignVertical: 'center'
    }


})



export default SearchView;