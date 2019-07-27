require('dotenv').config();
const axios = require('axios');
const Resource = require('../models/resource.model');

require('../configs/db.config');

const getBreeds = () => {
  try {
    return axios.get('https://api.themoviedb.org/3/discover/movie?api_key=e016bb653e56b77b851c1bce174aef59&/discover/movie?sort_by=popularity.desc')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = getBreeds()
    .then(response => {
      const filmArray = response.data.results;
      filmArray.forEach((film) => {
        Resource.create({
          title: film.title,
          description: film.overview,
          imageURL:`https://image.tmdb.org/t/p/w500/${film.poster_path}`,
          publishedDate: film.release_date,
          kind: "Film"
        })
      })
    })
    .catch(error => {
      console.log(error)
    })
}

countBreeds()