const { AsyncStorage } = require("react-native");



export const saveToStorage=async(id,name,media_type,imageUrl)=>{
    var item = {[id]:{id,name,media_type,imageUrl}}
    console.log(item,'1111111111');
    
    return await AsyncStorage.setItem(id.toString(),JSON.stringify(item))
   
}

export const getItemsFromStorage=async()=>{
  const keys =await AsyncStorage.getAllKeys();
  return AsyncStorage.multiGet(keys).then(
        res=>JSON.parse(res)
    )
} 

export const removeItemFromStorage=(id)=>{

    return AsyncStorage.removeItem(id.toString())
}