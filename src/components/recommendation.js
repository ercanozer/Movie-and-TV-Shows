import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { fetchRecommendetion } from '../services/requests'
import ListComponent from './listComponent'

export default class Recommendation extends Component {
    state = {
        allData:[]
    }
    componentDidMount(){
        fetchRecommendetion(this.props.media_type,this.props.id).then(res=>{
            this.setState({allData:res.data.results})
        })
    }

    render() {
        return (
            <View style={{paddingLeft:10}}>
                <ListComponent allData={this.state.allData} media_type={this.props.media_type} mainTitle={'none'} navigation={this.props.navigation}/>
            </View>
        )
    }
}
