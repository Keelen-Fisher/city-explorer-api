'use strict';

const axios = require('axios');

async function getMovie(request, response, next) {
  let city = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${city}`;
  try {
    let showMovie = await axios.get(url);
    console.log(searchQuery);
    let dataToSend = showMovie.data.results.map(object => new Showtimes(object));
    console.log(dataToSend);
    response.status(200).send(dataToSend);
  }
  catch (error) {
    response.status(500).send('error: Sorry, something went wrong. ');
  };
};

class Showtimes {

  constructor(movieObj) {
    //template literal: ${} 
    this.imgUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path};`
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.release_date = movieObj.release_date;
    this.popularity = movieObj.popularity;
    this.totalVotes = movieObj.vote_count;
    this.vote_avg = movieObj.vote_average;
  }
}


module.exports = getMovie;