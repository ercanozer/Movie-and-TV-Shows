import React, { Component } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Text, View, StyleSheet, Dimensions, ScrollView, Animated, ActivityIndicator } from 'react-native'
import { colors, windowHeight } from '../styles'
import { About, Cast, Recommendation } from '../components'






class DetailTabView extends Component {

    state = {
        navState: {
            index: 0,
            routes: [
                { key: 'about', title: 'About', offset: this.props.offset },
                { key: 'cast', title: 'Cast', offset: this.props.offset },
                { key: 'recommendation', title: 'Recommendation' },
            ],
        }
    };

    _handleIndexChange = index => this.setState(({ navState }) => ({ navState: { ...navState, index } }));

    scenes=SceneMap({
        about: (props) => {
            return <About {...props.route} setEnabled={this.props.setEnabled} genres={this.props.genres} overview={this.props.overview} detailInfo={this.props.detailInfo} />
        },
        cast: (props) => <Cast {...props.route} />,
        recommendation: (props) => <Recommendation {...props.route} />
    })

    render() {


        return (

            <TabView
            style={{backgroundColor:colors.mainBackgroundColor}}
                renderTabBar={(props) => {
                    return <TabBar {...props}
                        jumpTo={(key)=>props.jumpTo(key)}
                        pressColor='#1f4068'
                        indicatorStyle={{ backgroundColor: 'red' }}
                        inactiveColor='gray'
                        scrollEnabled={true}
                        labelStyle={{ textTransform: 'capitalize', fontSize: 15, fontFamily: 'sans-serif-medium' }} 
                        style={{ backgroundColor: colors.mainBackgroundColor}} 
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





const styles = StyleSheet.create({
    scene: {

    }
})

export default DetailTabView;