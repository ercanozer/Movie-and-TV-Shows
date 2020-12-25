import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const DetailInfo = (props) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={{color:'white',fontSize:22,fontFamily:'sans-serif-medium',marginLeft:10,marginBottom:5}}>Info</Text>
            <InfoItem infoData={props.detailInfo} />
        </View>
    )
}


const InfoItem = ({ infoData }) => {
    return (
        <View >
            <View style={styles.itemContainer}>
                {infoData !=undefined && infoData.map((item, index) => {
                    let deger = Object.keys(item);
                                   
                        
                   if(deger!='production_companies'){ 
                        return item[deger[0]]!='' && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemText}>{deger[0]}</Text>
                        <Text style={[styles.itemText,{color:'white',textAlign:'left'}]}>{item[deger[0]]}</Text>
                    </View>
                   }else{  
                       return <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginBottom:17 }}>
                       <Text style={styles.itemText}>Production Companies</Text>
                       <View style={{flexDirection:'row',width:'100%',flexWrap:'wrap'}} >
                   { item.production_companies.length !=0 ? item.production_companies.map((value,index)=><Text style={[styles.itemText,{color:'white',textAlign:'left',marginBottom:2,flexBasis:'100%'}]}>{value.name} {index!=item.production_companies.length-1 && ','}</Text>):<Text style={[styles.itemText,{color:'white',textAlign:'left',marginBottom:2,flexBasis:'100%'}]}>-
                       </Text>}
                       </View>
                   </View>
                   }
                  
                   
                }
                )}

            </View>

        </View>)
}


const styles = StyleSheet.create({
    itemContainer: {
    
        margin: 10,
        width: '50%',
    },
    mainContainer: {
        width: '100%',
        padding: 10
    },
    itemText:{
        textTransform:'capitalize',
        flexBasis:'95%',
        color:'gray',
        fontFamily:'sans-serif-medium',
        fontSize:15.9,
        marginBottom:22
    }
})

export default DetailInfo;