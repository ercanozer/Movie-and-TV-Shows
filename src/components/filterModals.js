import React from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, Image, ActivityIndicator, Animated, TextInput, LayoutAnimation, UIManager, DrawerLayoutAndroid, Modal, TouchableOpacity,TouchableWithoutFeedback,TouchableNativeFeedback      } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../styles'
import {genresData} from '../utilities/genresData'

const FilterModal = (props)=>{


    return   (
        <View>
            <View style={{flexDirection:'row',width:'100%',padding:8,justifyContent:'flex-start',alignItems:'center'}}>
                <FontAwesome5Icon onPress={()=>props.setFilterMode(null)}  style={{margin:4,marginRight:16}} name='arrow-left' size={24} color='white' />
                <Text style={{color:'white',fontSize:21,fontFamily:'sans-serif-medium'}}>{props.type}</Text>
            </View>
            {<FilterModals {...props} />}
        </View>
    )
}

const FilterModals = ({ type, sortByState, sortBySelectedId, sortData,sortContentData,changeProperties }) => {

    switch (type) {
        case 'Sort by':
            return <SortbyFilter sortContentData={sortContentData} changeProperties={changeProperties} state={sortByState} selectedId={sortBySelectedId} data={sortData} /> 

        case 'Genres':return <SortByGenres sortContentData={genresData} changeProperties={changeProperties} />    
      
    }

    return null
}

const RenderItem = ({ dataText, isSelected,changeProperties,item}) => {
    return (
        <TouchableWithoutFeedback onPress={()=>changeProperties(item.id,'setSortFilter')} activeOpacity={0.7} delayPressOut={1} >
            <View style={{ flexDirection: "row", padding: 3,paddingLeft:10,paddingRight:10, justifyContent: 'space-between', alignItems: 'center', margin: 6 }}>

            <Text style={{ color: 'white', fontSize: 17, fontFamily: 'sans-serif-medium' }}>{dataText}</Text>
            {isSelected && <FontAwesome5Icon name='check' color='red' size={22} />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const SortbyFilter = ({ state = 'desc', data, selectedId,changeProperties }) => {
    return (
        <View style={{ top:10, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mainBackgroundColor, height: '100%', zIndex: 5000 }}>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                <TouchableOpacity  activeOpacity={0.7} delayPressOut={0} onPress={() => changeProperties('asc','setSortType')}>
                  <View style={{ elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state == 'desc' ? null : 'red', padding: 5.5, borderColor: 'red', borderWidth: 2, borderRadius: 5, margin: 6 }}>
                    <FontAwesome5Icon color='white' name='sort-amount-up' style={{ margin: 4 }} size={21} />
                    <Text style={{ color: 'white' }}>Ascending</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => changeProperties('desc','setSortType')} >
                   <View style={{ elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state != 'desc' ? null : 'red', padding: 5.5, borderColor: 'red', borderWidth: 2, borderRadius: 5, margin: 6 }}>
                    <FontAwesome5Icon color='white' name='sort-amount-down' style={{ margin: 4 }} size={21} />
                    <Text style={{ color: 'white' }}>Descending</Text>
                   </View>
                </TouchableOpacity>
            </View>
            <FlatList

                style={{ width: '100%' }}
                data={data}
                renderItem={({ item }) => {
                    console.log(item)
                    return <RenderItem changeProperties={changeProperties}  item={item} key={item.id} dataText={item.text} isSelected={item.id == selectedId ? true : false} />
                }
                }
            />

        </View>
    )
}

const SortByGenres=()=>{
    return (
        <View style={{ top:10, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mainBackgroundColor, height: '100%', zIndex: 5000 }}>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                <TouchableOpacity  activeOpacity={0.7} delayPressOut={0} onPress={() => changeProperties('or','setSortGenresType')}>
                  <View style={{ elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state == 'desc' ? null : 'red', padding: 5.5, borderColor: 'red', borderWidth: 2, borderRadius: 5, margin: 6 }}>
                    <FontAwesome5Icon color='white' name='sort-amount-up' style={{ margin: 4 }} size={21} />
                    <Text style={{ color: 'white' }}>OR</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => changeProperties('and','setSortGenresType')} >
                   <View style={{ elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state != 'desc' ? null : 'red', padding: 5.5, borderColor: 'red', borderWidth: 2, borderRadius: 5, margin: 6 }}>
                    <FontAwesome5Icon color='white' name='sort-amount-down' style={{ margin: 4 }} size={21} />
                    <Text style={{ color: 'white' }}>AND</Text>
                   </View>
                </TouchableOpacity>
            </View>
            <FlatList

                style={{ width: '100%' }}
                data={data}
                renderItem={({ item }) => {
                    console.log(item)
                    return <RenderItem changeProperties={changeProperties}  item={item} key={item.id} dataText={item.text} isSelected={item.id == selectedId ? true : false} />
                }
                }
            />

        </View>
    )
}


export default FilterModal;