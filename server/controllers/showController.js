import omdb from "../config/omdb.js";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

/* ---------------- SEARCH MOVIES (OMDb) ---------------- */
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const { data } = await omdb.get("", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query,
        type: "movie",
      },
    });

    return res.status(200).json({
      success: true,
      movies: data.Search || [],
    });
  } catch (error) {
    console.error("OMDb search error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to search movies",
    });
  }
};



// export const searchMovies = async (req, res) => {
//   try {
//     console.log("✅ searchMovies hit");

//     const { query } = req.query;

//     if (!query) {
//       return res.status(400).json({
//         success: false,
//         message: "Search query is required",
//       });
//     }

//     const { data } = await omdb.get("", {
//       params: {
//         apikey: process.env.OMDB_API_KEY, // must match browser test
//         s: query,
//         type: "movie",
//       },
//     });

//     console.log("📦 OMDb response:", data.Response);

//     if (data.Response === "False") {
//       return res.json({
//         success: true,
//         movies: [],
//       });
//     }

//     return res.json({
//       success: true,
//       movies: data.Search,
//     });
//   } catch (error) {
//     console.error("OMDb search error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to search movies",
//     });
//   }
// };


/* ---------------- ADD SHOW ---------------- */

export const addShow = async (req, res) => {
  try {
    const { imdbID, showsInput, showPrice } = req.body;

    if (!imdbID || !showsInput || !showPrice) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let movie = await Movie.findOne({ imdbID });

    /* -------- FETCH MOVIE FROM OMDb IF NOT IN DB -------- */
    if (!movie) {
      const { data } = await omdb.get("", {
        params: {
          apikey: process.env.OMDB_API_KEY, // ✅ REQUIRED
          i: imdbID,
          plot: "full",
        },
      });

      if (data.Response === "False") {
        return res.status(404).json({
          success: false,
          message: "Movie not found in OMDb",
        });
      }

      movie = await Movie.create({
        imdbID: data.imdbID,
        title: data.Title,
        overview: data.Plot,
        poster: data.Poster,
        releaseDate: data.Released,
        runtime: data.Runtime,
        genres: data.Genre.split(", "),
        actors: data.Actors.split(", "),
        director: data.Director,
        imdbRating: data.imdbRating,
        language: data.Language,
        country: data.Country,
        boxOffice: data.BoxOffice,
      });
    }

    /* ---------------- CREATE SHOWS ---------------- */

    const showsToCreate = [];

    showsInput.forEach((show) => {
      show.time.forEach((time) => {
        showsToCreate.push({
          movie: movie._id,
          showDateTime: new Date(`${show.date}T${time}`),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    await Show.insertMany(showsToCreate);

    return res.status(201).json({
      success: true,
      message: "Shows added successfully",
    });
  } catch (error) {
    console.error("Add show error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add shows",
    });
  }
};
