import React, { Component } from 'react'
import { Text, View, FlatList, Image,  ActivityIndicator, Dimensions } from 'react-native'
import { homeStyles } from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class ListComponent extends Component {
    render() {
        return (
            <View style={{ width: '100%', height: 240, marginTop: 20 }}>
              {
             this.props.mainTitle != 'none' && <Text style={{ fontSize: 22, color: 'white', marginBottom: 13, fontFamily: 'sans-serif-medium', marginLeft: 7 }} >{this.props.mainTitle}</Text>
              }  
                <List listData={this.props.allData} navigation={this.props.navigation} />
            </View>
        )
    }
}



const List = ({ listData, navigation,error }) => {


    return (
        <FlatList style={{ width: '100%' }}
            horizontal
            ListEmptyComponent={!error ? <ActivityIndicator style={{marginHorizontal:Dimensions.get('window').width/2-20}} color='lightblue' size={50} />:<Text style={{ color:'white',fontSize:25,paddingHorizontal: Dimensions.get('window').width /3,alignSelf:'center' }}>Network Error !</Text>}
            showsHorizontalScrollIndicator={false}
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <ListItem
                id={item.id}
                media_type={item.media_type}
                navigation={navigation}
                key={index}
                title={item.media_type == 'movie' ? item.original_title : item.name}
                imageURL={item.poster_path} />} />
    )
}

const ListItem = ({ title, imageURL, navigation,id,media_type }) => {

    return (
        <TouchableOpacity onPress={() =>{
          
                navigation.push('Detail Screen', { params: { id:id,media_type:media_type != undefined ? media_type : 'tv',imageUrl:imageURL,name:title}})
        }} activeOpacity={0.8}>

            <View style={{ margin: 7 }}>
                <View style={{ width: 100, height: 140, elevation: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 28 }, }}>
                    <Image fadeDuration={200} resizeMode='center' style={{ width: '100%', height: "100%", borderRadius: 10 }}
                        source={{ uri: 'https://image.tmdb.org/t/p/original' + imageURL }} />
                </View>
                <Text numberOfLines={2} style={{ color: 'white', maxWidth: 105, padding: 5, fontSize: 13 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
