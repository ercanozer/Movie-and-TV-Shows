export const routeToDiscovery=(navigation,mainTitle,id=null)=>{
    if(mainTitle=='Movie Genres' ||mainTitle=='Movies' )
    navigation.navigate('Search Screen',{selectedTab:0,id,type:"setGenresSelectedIdsMovie"})
    else if(mainTitle=='TV Show Genres' ||mainTitle=='TV Shows' )
    navigation.navigate('Search Screen',{selectedTab:1,id,type:"setGenresSelectedIdsTv"})
    else if(mainTitle=='Genres' ){}
    else
    navigation.navigate('Search Screen')
}