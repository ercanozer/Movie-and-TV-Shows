import React, { Component } from "react";
import {
    WheelPicker,
    TimePicker,
    DatePicker
  } from "react-native-wheel-picker-android";
  import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";
 
  
  
  class MyPicker extends Component {
    state = {
      selectedItem: 10,
      years:['1980']
    };
  

    onItemSelected = selectedItem => {
      this.setState({ selectedItem });
    };

    componentDidMount(){
       const years =(startYear)=>{
            var currentYear = new Date().getFullYear(), years = [];
            startYear = startYear || 1980;  
            while ( startYear <= currentYear ) {
                years.push(startYear++);
            }   
            return years.map(item=>item.toString());
        }
        this.setState({years:years(1970)})
    }
  

  
    render() {
      return (
        <View>
          <WheelPicker
            selectedItemTextColor='white'
            itemTextColor='gray'
            selectedItemTextSize={22}
            selectedItem={this.state.selectedItem}
            data={this.state.years}
            onItemSelected={this.onItemSelected}
          />
        </View>
      );
    }
  }
  
export default MyPicker