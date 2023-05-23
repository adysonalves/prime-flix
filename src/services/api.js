

// Base da url: https://api.themoviedb.org/3/

//URL DA API: /movie/now_playing?api_key=e92c7cbae32dcf32369d3984e0119b90&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
