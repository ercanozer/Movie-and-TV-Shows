import axios from "axios"
import { platform } from "os";
const key = '044fd0a3f04bf451cef5916e03dbb2f0';
const CancelToken = axios.CancelToken;
var cancel;
export const fetchTrendMovies = async () => {

  return axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + key +
    '&include_video=false&language=en').then(res => {
      return res.data
    }).catch(err => console.log(err))
}
export const fetchTrendTv = async () => {

  return axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=' + key +
    '&include_video=false&language=en').then(res => {
      return res.data
    }).catch(err => console.log(err))
}

export const fetchDiscoverTvOrMovie = async (platform, network) => {

  return axios.get('https://api.themoviedb.org/3/discover/' + platform + '?api_key=' + key, {
    params: {
      sort_by: 'popularity.desc',
      language: 'en',
      with_networks: network
    }
  }).then(res=>res.data)
}
export const fetchDiscoverTvOrMovieForFiltering = async (platform,sortFilter,sortType,genres,year,avarage) => {
  var firstReleaseYear=platform =='movie'?'primary_release_year':'first_air_date_year'

  return axios.get('https://api.themoviedb.org/3/discover/' + platform + '?api_key=' + key, {
    params: {
      sort_by: `${sortFilter}.${sortType}`,
      language: 'en',
      [firstReleaseYear]:year,
      'vote_average.gte':avarage.min,
      'vote_average.lte':avarage.max,
       with_genres:genres.join("||")

      
    }
  }).then(res=>{
   
    return res.data.results}).catch(err=>console.log(err))
}

export const fetchSearchQuery=(text,page,source)=>{
  if (cancel !== undefined) cancel();
  return axios.get('https://api.themoviedb.org/3/search/multi?api_key=044fd0a3f04bf451cef5916e03dbb2f0',{
    cancelToken: new CancelToken(c => cancel = c),
    params:{
      query:text,
      page:page
    }
  }).then(res=>res.data).catch(error=>console.log(error))
}

export const fetchCast = async (platform,id) =>{
  return axios.get(`https://api.themoviedb.org/3/${platform}/${id}/credits?api_key=044fd0a3f04bf451cef5916e03dbb2f0&language=en-US`).then(res=>res.data)
}  

export const fetchGenres = async (title) => {

  return axios.get('https://api.themoviedb.org/3/genre/' + title +
    '/list?api_key=044fd0a3f04bf451cef5916e03dbb2f0', {
      params: {
        language: 'en'
      }
  }).then(res => {

    return res.data.genres;
  })
}

export const fetchDetail = async (media_type,id) => {
  
  return axios.get('https://api.themoviedb.org/3/'+media_type+'/'+id+
  '?api_key=044fd0a3f04bf451cef5916e03dbb2f0&append_to_response=images& include_image_language=en',{
    params: {
      language:'en'
    }
  }).then(res=>{
    //console.log(res.data)

    return res.data
  }).catch(err=>console.log(err))

}
export const fetchRecommendetion = async (media_type,id) => {
  return await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=044fd0a3f04bf451cef5916e03dbb2f0`)
}

export const fetchAdvancedQuery = async () => {
  
}