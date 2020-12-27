import React from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, Image, ActivityIndicator, Animated, TextInput, LayoutAnimation, UIManager, DrawerLayoutAndroid, Modal, TouchableOpacity,TouchableWithoutFeedback,TouchableNativeFeedback      } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../styles'
import {genresData, genresLists} from '../utilities/genresData'
import Picker from '@gregfrench/react-native-wheel-picker'
var PickerItem = Picker.Item;
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

const FilterModals = ({ type, sortByState, sortBySelectedId, sortData,sortContentData,selectedDate,changeProperties,genresState,genresSelectedItems }) => {

    switch (type) {
        case 'Sort by':
            return <SortbyFilter sortContentData={sortContentData} changeProperties={changeProperties} state={sortByState} selectedId={sortBySelectedId} data={sortData} /> 

        case 'Genres':return <SortByGenres data={genresLists.movieGenres} changeProperties={changeProperties} state={genresState} selectedIds={genresSelectedItems} />    
          
        case 'Date':return<SortByDate selectedDate={selectedDate} onDataItemSelected={changeProperties} />
       
        case 'Vote Avarage':return<SortByAvarage selectedAvareges={selectedDate} onDataItemSelected={changeProperties} />
    }

    return null
}

const RenderItem = ({ dataText, isSelected,changeProperties,item,cpType}) => {
    return (
        <TouchableWithoutFeedback onPress={()=>changeProperties(item.id,cpType)} activeOpacity={0.7} delayPressOut={1} >
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
                    return <RenderItem cpType="setSortFilter" changeProperties={changeProperties}  item={item} key={item.id} dataText={item.text} isSelected={item.id == selectedId ? true : false} />
                }
                }
            />

        </View>
    )
}

const SortByGenres=({data,selectedIds,state,changeProperties})=>{
    return (
        <View style={{ top:10, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mainBackgroundColor, height: '100%', zIndex: 5000 }}>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                <TouchableOpacity  activeOpacity={0.7} delayPressOut={0} onPress={() => changeProperties('or','setSortGenresType')}>
                  <View style={{ elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state == 'and' ? null : 'red', padding: 5.5, borderColor: 'red', borderWidth: 2, borderRadius: 5, margin: 6 }}>
                    
                    <Text style={{ color: 'white' }}>OR</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => changeProperties('and','setSortGenresType')} >
                   <View style={{ elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state != 'and' ? null : 'red', padding: 5.5, borderColor: 'red', borderWidth: 2, borderRadius: 5, margin: 6 }}>
                   
                    <Text style={{ color: 'white' }}>AND</Text>
                   </View>
                </TouchableOpacity>
            </View>
            <FlatList

                style={{ width: '100%' }}
                data={data}
                renderItem={({ item }) => {
                    console.log(item)
                    return <RenderItem cpType='setGenresSelectedIds' changeProperties={changeProperties}  item={item} key={item.id} dataText={item.name} isSelected={selectedIds.includes(item.id)} />
                }
                }
            />

        </View>
    )
}
const years=[]
const year=  new Date().getFullYear();
for (let index = 0; index < 60; index++) {
  years.push({id:year-index,name:year-index})
}
const voteNumbers=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}]
const SortByDate=({onDataItemSelected,selectedDate})=>{
  
      
    return (
        <View style={{maxHeight:'90%',marginTop:10}}>
           
            <FlatList
            data={years}
            renderItem={(item)=><RenderItem dataText={item.item.id} item={item.item} changeProperties={onDataItemSelected} cpType="setYear" isSelected={selectedDate==item.item.id}   />}
            />
      </View>
      );
}


const SortByAvarage=(selectedAvareges,onDataItemSelected)=>{
  return(<View style={{flexDirection:"row",flexWrap:"wrap"}}>
      <Text style={{flexBasis:Dimensions.get('window').width / 1.35/2,color:"green",fontWeight:"bold",fontSize:20,paddingLeft:10}}>min</Text>
      <Text style={{flexBasis:Dimensions.get('window').width / 1.35/2,color:"green",fontSize:20,fontWeight:"bold",paddingLeft:10,paddingBottom:10}}>max</Text>
     <FlatList
     style={{flexBasis:Dimensions.get('window').width / 1.35/2,}}
            data={voteNumbers}
            renderItem={(item)=><RenderItem dataText={item.item.id} item={item.item} changeProperties={onDataItemSelected} cpType="setYear" isSelected={selectedAvareges==item.item.id}   />}
            />
            
     <FlatList
       style={{flexBasis:Dimensions.get('window').width / 1.35/2,}}
            data={voteNumbers}
            renderItem={(item)=><RenderItem dataText={item.item.id} item={item.item} changeProperties={onDataItemSelected} cpType="setYear" isSelected={selectedAvareges==item.item.id}   />}
            />
    </View>);
}


export default FilterModal;