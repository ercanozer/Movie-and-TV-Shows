import React, { Component, useState, useEffect } from 'react'
import { Text, View ,FlatList, StyleSheet, Dimensions, Image} from 'react-native'
import { saveToStorage, getItemsFromStorage } from '../utilities/saveFavorite'
import MaterialTabs from 'react-native-material-tabs';
import { colors } from '../styles';
import { fetchSearchQuery } from '../services/requests';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeAds } from '../components';
import FastImage from 'react-native-fast-image';
import { Values } from '../utilities/detailInfoTransporter';
const Favorite = (props) => {
    const [numColumn, setNumColumn] = useState(3);
    const [data, setData] = useState({ 0: [], 1: [], 2: [] })
    const [selectedTab, setSelectedTab] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('a');
    const [showAd, setShowAd] = useState(false);



    const changeLayout = () => {
        setNumColumn(() => numColumn == 2 ? 3 : 2)
    }

    const refreshData = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        
            getItemsFromStorage().then(res=>{

                 setData(prevState => ({
                    ...prevState,
                    0: prevState[0].concat(res.filter((item, index) => item.media_type == 'movie')),
                    1: prevState[1].concat(res.filter((item, index) => item.media_type == 'tv')),
                    2: prevState[2].concat(res.filter((item, index) => item.media_type == 'person'))
                }))
            })
               
               

           
        


    }, [])

    return (
        <View style={{flex:1,backgroundColor:colors.mainBackgroundColor,paddingTop:0,alignItems:'center'}}>
            <Text style={{color:'white',fontSize:21,height:56,fontFamily:'sans-serif-medium',textAlignVertical:"center",backgroundColor:colors.mainBackgroundColor,width:'100%',padding:11,elevation:5}}>Watch List</Text>
            <View style={{ width: '88%', borderRadius: 10, overflow: 'hidden',elevation:7,marginTop:8,marginBottom:11 }}>
                <MaterialTabs
                    barHeight={44}
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
            <FlatList
                            key={selectedTab == 2 ? 1 : numColumn != 2 ? 3 : 1}
                            style={{ width: '100%', paddingTop: 10 }}
                            keyExtractor={(item, index) => index}
                            data={data[selectedTab]}
                            ListFooterComponent={data[selectedTab].length==0 && (<View>
                                <Text style={{color:'gray',fontSize:23,fontFamily:'sans-serif-medium',textAlign:"center",marginBottom:20}}>You haven't added anything yet</Text>
                            </View>)}
                            ListFooterComponentStyle={{alignSelf:'center',marginTop:10}}
                            numColumns={selectedTab == 2 ? 1 : numColumn != 2 ? 3 : 1}
                            contentContainerStyle={{ alignItems: 'flex-start' }}
                            onEndReached={refreshData}
                            onEndReachedThreshold={0.8}
                            renderItem={({ item, index }) => item.media_type == 'person' ? <CastComp key={index} path={item.profile_path} name={item.name} characterName={item.character} /> :  <ListItem
                                id={item.id}
                                media_type={item.media_type}
                                navigation={props.navigation}
                                key={index}
                                title={item.name}
                                imageURL={item.imageUrl} /> } />
                              

        </View>
    )
    }
    const ListItem = ({ title, imageURL, navigation, id, media_type }) => {
        console.log({ title, imageURL, navigation, id, media_type })
        return (
            <TouchableOpacity
                style={{ width: Dimensions.get('window').width / 3.25, margin: 5 }} onPress={() => {
                    Values.params={ id, media_type: media_type != undefined ? media_type : 'movie', imageUrl: imageURL, name: title }
           
             
    
                      navigation.navigate('Detail Screen')
            
    
                }}>
    
                <View style={{ margin: 7 }}>
                    <View style={{ elevation: 10 }}>
                        {imageURL != null ? <Image fadeDuration={0} resizeMode='cover' style={{ width: '100%', aspectRatio: 0.67, borderRadius: 10 }}
                            source={{ uri: 'http://image.tmdb.org/t/p/original' + imageURL }} /> : <FontAwesome5Icon style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', aspectRatio: 0.67, borderRadius: 10 }} name='camera' color='gray' size={40} />}
    
                    </View>
                    <Text numberOfLines={2} style={{ color: 'white', maxWidth: Dimensions.get('window').width / 3.25, padding: 2, fontSize: 13 }}>{title}</Text>
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
                <FastImage resizeMethod='auto' resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: profilePath != null ? 'http://image.tmdb.org/t/p/original' + profilePath : 'http://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png' }} />
            </View>
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
        }
    })
    

export default Favorite 
