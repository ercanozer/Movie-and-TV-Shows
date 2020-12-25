import React, { Component, useState, useEffect } from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'
import {colors,windowHeight} from '../styles'
import {GenresComponent,DetailInfo} from '../components'
import { AdMobBanner } from 'react-native-admob'


class About extends Component {
    state={
        y:3000
    }
    componentDidMount(){
    }
   
render(){
    const translateY = this.props.offset.interpolate({
        inputRange: [0,windowHeight/1.8,(windowHeight-100)<=this.state.y?windowHeight/1.8+(this.state.y-(windowHeight-100)):windowHeight/1.8],
        outputRange: [0,0,(windowHeight-100)<=this.state.y?-(this.state.y-(windowHeight-100)):-100],
        extrapolate:'clamp'
        
    });
    return(

               <Animated.View onLayout={({nativeEvent})=>{

                this.props.setHeight(0,nativeEvent.layout.height)
                   this.setState({y:nativeEvent.layout.height})}} style={{translateY:translateY,paddingBottom:50}}>
                       <View style={{alignSelf:'center',marginTop:15}}>

                             <AdMobBanner
                            
                            adSize="banner"
                            adUnitID="ca-app-pub-3940256099942544/6300978111"                       
                            onAdFailedToLoad={error => console.error(error)}
                            />
                            </View>
               <View style={styles.textContainer}>
                   <Text suppressHighlighting={true} style={styles.overviewText}>{this.props.overview}</Text>
               </View>
               <GenresComponent allData={this.props.genres} mainTitle='Genres' />
              
               <DetailInfo detailInfo={this.props.detailInfo} />
               </Animated.View>
       )
    }
    }
    

    const styles=StyleSheet.create({
        textContainer:{
            margin:14
        },
        overviewText:{
            fontSize:14.5,
            color:'#e0dede',
            fontFamily:'sans-serif-medium'
        }
    })

export default About;