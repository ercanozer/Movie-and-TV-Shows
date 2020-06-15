import React, { Component } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Text, View, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native'
import {colors} from '../styles'



const scenes=SceneMap({
    cast:(props)=>{
        return <AboutScreen {...props.route} />},
about:(props)=>{
    return <AboutScreen {...props.route} />},
    recommendation:()=><View><Text>recommendation</Text></View>
})


class DetailTabView extends Component {
    state = {
        navState:{
            index: 0,
            routes: [
                { key: 'cast', title: 'Cast',offset:this.props.offset },
                { key: 'about', title: 'About',offset:this.props.offset },
                { key: 'recommendation', title: 'Recommendation' },
            ],
        }
    };

    _handleIndexChange = index => this.setState(({navState})=>({navState:{...navState,index}}));


    render() {
        return (
         

            <TabView
           renderTabBar={(props)=><TabBar {...props} indicatorStyle={{backgroundColor:'red'}}  inactiveColor='gray' scrollEnabled={true} labelStyle={{textTransform:'capitalize',fontSize:15,fontFamily:'sans-serif-medium'}}  style={{backgroundColor:colors.mainBackgroundColor}} tabStyle={{borderRadius:20,width:'auto',marginLeft:15,marginRight:15}} />}
           navigationState={this.state.navState}
           onIndexChange={this._handleIndexChange}
           renderScene={scenes} 
           initialLayout={{width:Dimensions.get('window').width}}  
           />
        
        );
    }
}


const AboutScreen=(props)=>{
const translateY = props.offset.interpolate({
    inputRange: [0, Dimensions.get('window').height/1.8],
    outputRange: [0,Dimensions.get('window').height/1.8],
    extrapolate: "clamp",
  });
   return(
       <Animated.ScrollView
       bounces={true}
       scrollEventThrottle={1}
       onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: props.offset },
            },
          },
        ],
        { useNativeDriver: true }
      )}
       >
           <Animated.View style={{paddingBottom:Dimensions.get('window').height/1.8+70,transform:[{translateY:translateY}]}}>

           <View >
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
               <Text style={{height:200}}>asdasd</Text>
             
           </View>
           </Animated.View>
       </Animated.ScrollView>
   )
}


const styles=StyleSheet.create({
    scene:{
       
    }
})

export default DetailTabView;