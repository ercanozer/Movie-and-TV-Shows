import React, { Component } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Text, View, StyleSheet, Dimensions, ScrollView, Animated, ActivityIndicator, LayoutAnimation, UIManager } from 'react-native'
import { colors, windowHeight } from '../styles'
import { About, Cast, Recommendation } from '../components'



if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


class DetailTabView extends Component {

    
    
    state = {
        navState: {
            index: 0,
            routes: [
                { key: 'about', title: 'About', offset: this.props.offset },
                { key: 'cast', title: 'Cast', offset: this.props.offset },
                { key: 'recommendation', title: 'Recommendation',offset: this.props.offset },
            ],
        },
        heights:[300,300,270]
    };

    _handleIndexChange = index => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState(({ navState }) => ({ navState: { ...navState, index }}))
    };

  setHeight=(index,value)=>{
        let copyHeight=[...this.state.heights]
        copyHeight[index]= value;
        this.setState({heights:copyHeight})
    }
 scenes=SceneMap({
        about: (props) => {
            return <About setHeight={this.setHeight} {...props.route} scrollHeight={this.props.scrollHeight} setEnabled={this.props.setEnabled} genres={this.props.genres} overview={this.props.overview} detailInfo={this.props.detailInfo} />
        },
        cast: (props) => <Cast setHeight={this.setHeight} {...props.route}   cast={this.props.cast} /> ,
        recommendation: (props) => <Recommendation {...props.route} setHeight={this.setHeight} {...props.route} navigation={this.props.navigation} id={this.props.id} media_type={this.props.media_type} />
    })

   
    render() {
 


        return (

            <TabView
        
            style={{height:this.state.heights[this.state.navState.index]}}
                renderTabBar={(props) => {
                    return <TabBar {...props}
                        
                        jumpTo={(key)=>props.jumpTo(key)}
                        pressColor='#1f4068'
                        indicatorStyle={{ backgroundColor: 'red' }}
                        inactiveColor='gray'
                        scrollEnabled={true}
                        labelStyle={{ textTransform: 'capitalize', fontSize: 15, fontFamily: 'sans-serif-medium' }} 
                        style={{ backgroundColor: colors.mainBackgroundColor,height:50}} 
                        tabStyle={{ borderRadius: 20, width: 'auto', marginLeft: 15, marginRight: 15 }} />
                }
           }

                navigationState={this.state.navState}
                onIndexChange={this._handleIndexChange}
                renderScene={this.scenes}
                initialLayout={{ width: Dimensions.get('window').width }}
            />

        );
    }
}

export default DetailTabView;