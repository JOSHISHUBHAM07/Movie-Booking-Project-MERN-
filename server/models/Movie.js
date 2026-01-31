import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    imdbID: {
      type: String,
      required: true,
      unique: true,
    },
    title: String,
    overview: String,
    poster: String,
    releaseDate: String,
    runtime: String,
    genres: [String],
    actors: [String],
    director: String,
    imdbRating: String,
    language: String,
    country: String,
    boxOffice: String,
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;