import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { homeStyles } from '../styles'

export default class ListComponent extends Component {
    render() {
        return (
            <View style={{ width: '100%', height: 220 }}>
                <Text style={{ fontSize: 20, color: 'white', marginBottom: 10 }} >{this.props.mainTitle}</Text>
                <List listData={this.props.allData} />
            </View>
        )
    }
}

const List = ({ listData }) => {

    return (
        <FlatList style={{ width: '100%'}} 
        horizontal 
        data={listData}
        renderItem={({ item, index }) => <ListItem key={index} title={item.original_title} imageURL={item.poster_path} /> } />
    )
}

const ListItem = ({ title, imageURL }) => {
console.log(title)
    return (
        <View style={{ margin: 5 }}>
            <View style={{width:100,height:140,elevation:10,shadowColor:'black',  shadowOffset: { width: 0, height: 28 }, }}>
            <Image fadeDuration={200} resizeMode='center'  style={{width:'100%',height:"100%",borderRadius:10}}
                source={{ uri: 'https://image.tmdb.org/t/p/original' + imageURL }} />
        </View>
            <Text numberOfLines={2} style={{color:'white',maxWidth:105,padding:5,fontSize:13}}>{title}</Text>
        </View>
    )
}
