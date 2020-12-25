const { AsyncStorage } = require("react-native");



export const saveToStorage = async (id, name, media_type, imageUrl) => {
    var item = { id, name, media_type, imageUrl}
    console.log(item, '1111111111');

    return await AsyncStorage.setItem(id.toString(), JSON.stringify(item))

}

export const getItemsFromStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(keys)
    return allData.map(item=>JSON.parse(item[1]))
}

export const removeItemFromStorage = (id) => {

    return AsyncStorage.removeItem(id.toString())
}