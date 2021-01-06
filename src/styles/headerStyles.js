import { StyleSheet } from "react-native";
import {colors} from '../styles'

const headerStyles=StyleSheet.create({
mainHeader:{
    zIndex:999,
    paddingRight:15,
    height:56,
    width:'100%',
    backgroundColor:'#151D27',
    flexDirection:'row',
    elevation:10,
    justifyContent:'space-between',
    alignItems:'center'
},
headerText:{
    textAlign:'center',
    textAlignVertical:'center',
    paddingLeft:8,
    fontSize:27,
    fontFamily:'sans-serif-medium',
    color:'#ff0000',
}
})

export default headerStyles;