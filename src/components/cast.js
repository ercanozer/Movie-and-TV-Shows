import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'
import {ActorComponent} from '../components'
import { windowHeight } from '../styles';

export default class Cast extends Component {
    state={
        y:7000
    }
    render() {
        const translateY = this.props.offset.interpolate({
            inputRange: [0,windowHeight/1.8,(windowHeight-100)<=this.state.y?windowHeight/1.8+(this.state.y-(windowHeight-100)):windowHeight/1.8],
            outputRange: [0,0,(windowHeight-100)<=this.state.y?-(this.state.y-(windowHeight-100)):0],
            extrapolate:'clamp'
            
        });
        return (
           <View>

            <Animated.View onLayout={({nativeEvent})=>{
                               this.props.setHeight(1,nativeEvent.layout.height)
                this.setState({y:nativeEvent.layout.height})}} style={{translateY:translateY,paddingBottom:50,}}>
                <ActorComponent castData={this.props.cast} />
            </Animated.View>
           </View> 
        )
    }
}
