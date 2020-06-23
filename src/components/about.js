import React, { Component, useState, useEffect } from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'
import {colors,windowHeight} from '../styles'
import {GenresComponent,DetailInfo} from '../components'


class About extends Component {
    state={
        y:7000
    }
    componentDidMount(){
        console.log('CALISMA BE')

    }
   
render(){
    const translateY = this.props.offset.interpolate({
        inputRange: [0,windowHeight/1.8,this.state.y-windowHeight/1.8-windowHeight/1.8 >=0? this.state.y-windowHeight/1.8:windowHeight/1.8+1],
        outputRange: [0,0,-this.state.y+windowHeight],
        extrapolate:'extend'
        
    });
    return(
        <Animated.ScrollView
        bounces={false}    
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        onScroll={({nativeEvent})=>console.log(nativeEvent.contentOffset.y)}>
               <Animated.View onLayout={({nativeEvent})=>{
               console.log(nativeEvent.layout.height-windowHeight/1.8)
               this.setState({y:nativeEvent.layout.height})}} style={{translateY:translateY}}>
               <View style={styles.textContainer}>
                   <Text suppressHighlighting={true} style={styles.overviewText}>{this.props.overview}</Text>
               </View>
               <GenresComponent allData={this.props.genres} mainTitle='Genres' />
               <DetailInfo detailInfo={this.props.detailInfo} />
               <DetailInfo detailInfo={this.props.detailInfo} />
               </Animated.View>
           </Animated.ScrollView>
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