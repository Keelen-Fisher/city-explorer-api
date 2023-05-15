'use strict';

let cache = require('./cache.js');
const axios = require('axios');

async function getMovies(request, response, next) {
  let city = request.query.city;
  let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=1&query=${city}`;
  const key = 'movies-' + city;

  try {

    if (cache[key] && (Date.now() - cache[key].timestamp < 20000)) {
      console.log('Cache hits and scores!');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache swings and a miss! ');
      cache[key] = {};
      cache[key].timestamp = Date.now();

      let showMovie = await axios.get(url);
      let dataToSend = showMovie.data.results.map(movieObj => new Playing(movieObj));

      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      };
      response.status(200).send(dataToSend);
    }
  }catch (error) {
    response.status(500).send('error: Sorry, something went wrong. ');
  }

}

class Playing {

  constructor(movieObj) {
    //template literal: ${} 
    this.imgUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path};`
    this.title = movieObj.title;
    this.poster = movieObj.poster_path;
    this.overview = movieObj.overview;
    this.vote_avg = movieObj.vote_average;
    this.totalVotes = movieObj.vote_count;
    this.popularity = movieObj.popularity;
    this.release_date = movieObj.release_date;
  }
}


module.exports = getMovies;
