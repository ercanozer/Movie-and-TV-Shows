import axios from "axios"
const key ='044fd0a3f04bf451cef5916e03dbb2f0';
export const fetchTrendMovies=async()=>{
   
  return axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key='+key+
    '&include_video=false&language=en').then(res=>{
        return res.data
    }).catch(err=>console.log(err))
}
export const fetchTrendTv=async()=>{
   
  return axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key='+key+
    '&include_video=false&language=en').then(res=>{
        return res.data
    }).catch(err=>console.log(err))
}

export const fetchGenres=async(title)=>{

  return axios.get('https://api.themoviedb.org/3/genre/'+title+
  '/list?api_key=044fd0a3f04bf451cef5916e03dbb2f0',{params:{
    language:'en'
  }}).then(res=>{

    return res.data.genres;
  })
}