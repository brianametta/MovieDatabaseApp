var mongoose = require("mongoose");

//TODO update schema to allow for JSON arrays
var movieSchema = mongoose.Schema({
  movieId: [
    {
      type: {
        type: String
      },
      required: true
    }
  ]
});

var Movie = (module.exports = mongoose.model("Movie", movieSchema));

module.exports.getMovies = function(callback, limit) {
  Movie.find(callback).limit(limit);
};

module.exports.getMovieById = function(id, callback, limit) {
  Movie.findById(id, callback);
};

module.exports.addMovie = function(movie, callback) {
  Movie.create(movie, callback);
};

//Update Movie
module.exports.updateMovie = function(id, movie, options, callback) {
  var query = { _id: id };
  var update = {
    movieId: movie.movieId
  };
  Movie.findOneAndUpdate(query, update, options, callback);
};
