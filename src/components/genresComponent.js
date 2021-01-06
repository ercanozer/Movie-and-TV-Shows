
import React, { Component } from 'react'
import { Text, View, FlatList,TouchableOpacity } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { routeToDiscovery } from '../utilities/categoryRouter'


const GenresComponent = ({ mainTitle, allData,navigation }) => {

    return (
        <View style={{ width: '100%', padding:10,marginLeft:10, alignItems: 'flex-start', marginBottom: 30 }}>
            <Text style={{ color: 'white', fontSize: 22, marginBottom: 11, fontFamily: "sans-serif-medium" }}>{mainTitle}</Text>
            <GenresList navigation={navigation} mainTitle={mainTitle} listData={allData} />
        </View>
    )
}

const GenresList = ({ listData,mainTitle,navigation }) => {


    return (
        <FlatList style={{ width: '100%' }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <ListItem navigation={navigation} mainTitle={mainTitle} id={item.id}  key={index} title={item.name} />} />
    )
}
const ListItem = ({ title, id,mainTitle,navigation }) => {

    return (
        <TouchableOpacity onPress={()=>routeToDiscovery(navigation,mainTitle,id)} style={{
            flexDirection: 'row', justifyContent: 'flex-start', width: null, alignItems: 'center'
            , backgroundColor:'#1f4068', paddingLeft: 8, paddingRight: 8, borderRadius: 40, marginRight: 6
        }}>
            <Text style={{ color: '#e6f5ff', marginRight: 6, fontSize: 14, paddingBottom: 2 }}>{title}</Text>
            <FontAwesome5Icon  name='angle-right' size={24.5} color='lightblue' />
        </TouchableOpacity>
    )
}

export default GenresComponent;