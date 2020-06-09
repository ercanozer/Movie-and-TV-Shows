import axios from "axios"
const key ='044fd0a3f04bf451cef5916e03dbb2f0';
export const fetchDiscoverMovies=async()=>{
   
  return axios.get('https://api.themoviedb.org/3/discover/movie?api_key='+key+
    '&sort_by=popularity.desc&include_video=false').then(res=>{
        return res.data
    }).catch(err=>console.log(err))
}
