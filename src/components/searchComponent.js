import React, { Component, useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, Image, ActivityIndicator, Animated,TextInput } from 'react-native'
import MaterialTabs from 'react-native-material-tabs';
import { colors, windowHeight } from '../styles';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ActorComponent from './actorComponent';
import { fetchSearchQuery } from '../services/requests';
import { TouchableOpacity } from 'react-native-gesture-handler';



const SearchView = (props) => {
    const [numColumn, setNumColumn] = useState(3);
    const [data, setData] = useState({0:[],1:[],2:[]})
    const [selectedTab, setSelectedTab] = useState(0);
    const [page,setPage] = useState(1);
    const [query,setQuery] = useState('');

    const [opacityValue]=useState(new Animated.Value(windowHeight));

    const changeLayout = () => {
        setNumColumn(() => numColumn == 2 ? 3 : 2)
    }

    const refreshData=()=>{
        setPage(page+1)      
    }

    const changeText=async(query)=>{  
        
        if(query==''){
            setData({0:[],1:[],2:[]})

        }else{
             fetchSearchQuery(query,1).then(res1=>{
        fetchSearchQuery(query,2).then(res2=>{
            var array0=(res1.results.filter((item,index)=>item.media_type=='movie')).push(res2.results.filter((item,index)=>item.media_type=='movie'));
            console.log(array0,'bok')
            setData(prevState=>({
                ...prevState,
                0:(res1.results.filter((item,index)=>item.media_type=='movie')).concat(res2.results.filter((item,index)=>item.media_type=='movie')),
                1:(res1.results.filter((item,index)=>item.media_type=='tv')).concat(res2.results.filter((item,index)=>item.media_type=='tv')),
                2:(res1.results.filter((item,index)=>item.media_type=='person')).concat(res2.results.filter((item,index)=>item.media_type=='person'))
            }))
        })

       })
         
          setPage(3)
        }
         setQuery(query)
      
     
    }

    useEffect( ()=>{


        if(query==''){
            setData({0:[],1:[],2:[]})

        }else{
            fetchSearchQuery(query,page).then(res=>{
            setData(prevState=>({
                ...prevState,
                0:prevState[0].concat(res.results.filter((item,index)=>item.media_type=='movie')),
                1:prevState[1].concat(res.results.filter((item,index)=>item.media_type=='tv')),
                2:prevState[2].concat(res.results.filter((item,index)=>item.media_type=='person'))
            }))

            console.log(res.page)
        })
        }

        
    },[page])
    
    useEffect(()=>{

        
      Animated.timing(opacityValue,{
            toValue:0,
            duration:200,
            useNativeDriver:true,
        }).start((result)=>console.log(result))
        console.log('reaaytrarraarraara')


    }
    ,[])

 
    return (
        <Animated.View style={{ flex: 1, width: '100%', translateY:opacityValue,height: windowHeight,paddingBottom:223, backgroundColor: colors.mainBackgroundColor, position: 'absolute', zIndex: 9000 }}>
            <Animated.View style={{ backgroundColor: '#222831' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                    <FontAwesome5Icon onPress={props.closeSearch} style={{ marginLeft: 5 }} color='white' name='chevron-left' size={29} />
                    </TouchableOpacity>
                        
                    <TextInput
                    onChangeText={changeText}
                    placeholder='Search...' placeholderTextColor='gray' style={{ width: '85%', fontSize: 16.7, color: 'white', marginLeft: 12 }} />
                    <TouchableOpacity delayPressOut={0} onPress={changeLayout}>
                        <FontAwesome5Icon style={{ marginLeft: 2 }} color='white' name={numColumn == 2 ? 'th-list' : 'th'} size={22.5} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '70%', borderRadius: 15, overflow: 'hidden', alignSelf: 'center' }}>
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
                <View style={{backgroundColor:colors.mainBackgroundColor}}>

                {query!='' ? <FlatList

                 style={{width:'100%'}} 
                 keyExtractor={(item,index)=>index} 
                 data={data[selectedTab]}
                 numColumns={3}
                 contentContainerStyle={{alignItems:'flex-start'}}
                 onEndReached={refreshData}
                 onEndReachedThreshold={0.8}
                 ListFooterComponent={<ActivityIndicator color='white' size={40}/>}
                 ListFooterComponentStyle={{alignSelf:'center',margin:10}}
                 renderItem={({ item, index }) =>item.media_type=='person'?<CastComp key={index} path={ item.profile_path} name={item.name} characterName={item.character} />: <ListItem
                 id={item.id}                     
                 media_type={item.media_type}
                 navigation={props.navigation}
                 key={index}
                 title={item.media_type == 'movie' ? item.original_title : item.name}
                 imageURL={ item.poster_path} />}  />:<View style={{alignItems:'center'}}><Text style={{color:'gray',fontSize:30,alignSelf:'center',marginTop:20,marginBottom:5,fontFamily:'sans-serif-medium'}}>Search Something</Text><FontAwesome5Icon size={35} color='gray' name='search' /></View>  }
                 
               
                 </View>
    
            </Animated.View>
        </Animated.View>
    )
}
const ListItem = ({ title, imageURL, navigation,id,media_type }) => {

    console.log(imageURL)
    return (
        <TouchableOpacity
        style={{width:Dimensions.get('window').width/3.25,margin:5}} onPress={() => navigation.navigate('Detail Screen', { params: { id:id,media_type:media_type,imageUrl:imageURL,name:title} })} activeOpacity={0.8}>

            <View style={{ margin: 7 }}>
                <View style={{elevation: 10 }}>
                    {imageURL !=null? <Image loadingIndicatorSource={{}} fadeDuration={0} resizeMode='cover' style={{ width: '100%', aspectRatio:0.67, borderRadius: 10 }}
                        source={{ uri: 'https://image.tmdb.org/t/p/original' + imageURL }} />:<FontAwesome5Icon style={{textAlign:'center',textAlignVertical:'center', width: '100%', aspectRatio:0.67, borderRadius: 10 }} name='camera' color='gray' size={40} />}
                   
                </View>
                <Text numberOfLines={2} style={{ color: 'white', maxWidth: Dimensions.get('window').width/3.25, padding: 2, fontSize: 13 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const CastComp = ({ path, name, characterName }) => {

    return (
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',alignSelf:'center',marginBottom:30, }}>
            <ImageItem profilePath={path} />
            <View style={{ flexDirection: 'column',marginLeft:16,alignItems:'flex-start',justifyContent:'center' }}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={{color:'gray',fontSize:16}}>{characterName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ImageItem = ({ profilePath }) => {
console.log(profilePath)
    return (

        <View style={styles.imageContainer}>
            <Image resizeMethod='auto' resizeMode='cover' style={{ width: '100%', height: '100%'}} source={{ uri: profilePath !=null ?'https://image.tmdb.org/t/p/original' + profilePath : 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png'}} />
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



export default SearchView;