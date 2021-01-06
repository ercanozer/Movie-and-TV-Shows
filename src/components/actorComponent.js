import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';
const ActorComponent = ({ castData }) => {
   
    return (
        <View style={{ margin:10,padding:5 }}>
            {castData.cast.map((item, index) => {
                return <CastComp key={index} path={ item.profile_path} name={item.name} characterName={item.character} />
            })}
          
        </View>
    )
}

const CastComp = ({ path, name, characterName }) => {

    return (
        <TouchableOpacity onPress={()=>{Snackbar.show({
            text: 'Coming Soon',
            textColor:'black',
            backgroundColor:'orange',
            duration: Snackbar.LENGTH_SHORT,
          });}} style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',alignSelf:'center',marginBottom:30, }}>
            <ImageItem profilePath={path} />
            <View style={{ flexDirection: 'column',marginLeft:16,alignItems:'flex-start',justifyContent:'center' }}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={{color:'gray',fontSize:16}}>{characterName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ImageItem = ({ profilePath }) => {

    return (

        <View style={styles.imageContainer}>
            <FastImage resizeMethod='auto' resizeMode='cover' style={{ width: '100%', height: '100%'}} source={{ uri: profilePath !=null ?'http://image.tmdb.org/t/p/original' + profilePath : 'http://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: Dimensions.get('window').width / 10,
        overflow: 'hidden',
        width: Dimensions.get('window').width / 4.8,
        aspectRatio: 1,
        borderColor:'lightblue',
        borderWidth:1
    },
    nameText:{
        color:'white',
        fontFamily:'sans-serif-medium',
        fontSize:18,
        marginBottom:4
    }
})

export default ActorComponent;
