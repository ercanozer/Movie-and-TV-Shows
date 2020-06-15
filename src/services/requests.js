import axios from "axios"
const key = '044fd0a3f04bf451cef5916e03dbb2f0';
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