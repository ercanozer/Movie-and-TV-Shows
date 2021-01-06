import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, Dimensions, Image } from 'react-native'
import { homeStyles } from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AdMobInterstitial } from 'react-native-admob'
import { CommonActions } from '@react-navigation/native';
import {Values} from '../utilities/detailInfoTransporter'
import FastImage from 'react-native-fast-image'

export default class ListComponent extends Component {
    render() {

        return (
            <View style={{ width: '100%', height: 240, marginTop: 20 }}>
                {
                    this.props.mainTitle != 'none' && <Text style={{ fontSize: 22, color: 'white', marginBottom: 13, fontFamily: 'sans-serif-medium', marginLeft: 7 }} >{this.props.mainTitle}</Text>
                }
                <List mainTitle={this.props.mainTitle} media_type={this.props.media_type} listData={this.props.allData} navigation={this.props.navigation} />
            </View>
        )
    }
}



const List = ({ listData, navigation, error, media_type, mainTitle }) => {

    return (
        <FlatList style={{ width: '100%' }}
            horizontal


            ListEmptyComponent={!error ? <ActivityIndicator style={{ marginHorizontal: Dimensions.get('window').width / 2 - 20 }} color='lightblue' size={50} /> : <Text style={{ color: 'white', fontSize: 25, paddingHorizontal: Dimensions.get('window').width / 3, alignSelf: 'center' }}>Network Error !</Text>}
            showsHorizontalScrollIndicator={false}
            data={listData}
            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item, index }) => <ListItem
                mainTitle={mainTitle}
                id={item.id}
                media_type={media_type}
                navigation={navigation}
                key={index}
                title={media_type == 'tv' ? item.name : item.original_title}
                imageURL={item.poster_path} />} />
    )
}

const ListItem = ({ title, imageURL, navigation, id, media_type, mainTitle }) => {
    console.log(imageURL)
    var condition = mainTitle != 'none' ? 'navigate' : 'replace'
    return (
        <TouchableOpacity onPress={() => {

            Values.params={ id, media_type: media_type != undefined ? media_type : 'movie', imageUrl: imageURL, name: title }
            AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(err=>   navigation[condition]('Detail Screen'));
           
            AdMobInterstitial.addEventListener("adClosed", () => {

                  navigation[condition]('Detail Screen')
           

            });

            AdMobInterstitial.addEventListener("adFailedToLoad", () => {
                navigation[condition]('Detail Screen')
            });


        }} activeOpacity={0.8} style={{ height: 190 }}>

            <View style={{ margin: 7 }}>
                <View style={{ width: 100, height: 140, elevation: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 28 }, }}>
                    <FastImage
                
                         resizeMode='center' style={{ width: '100%', height: "100%", borderRadius: 10 }}
                        source={{ uri: 'http://image.tmdb.org/t/p/original' + imageURL ,priority:'high'}} />
                </View>
                <Text numberOfLines={2} style={{ color: 'white', maxWidth: 105, padding: 5, fontSize: 13 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
