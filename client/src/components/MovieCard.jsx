import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goToMovie = () => {
    navigate(`/movies/${movie?._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="flex flex-col justify-between bg-gray-800 rounded-2xl 
                 transition duration-300 hover:-translate-y-1 hover:shadow-2xl
                 w-64 overflow-hidden"
    >
      {/* Movie Image */}
      <div className="relative">
        <img
          onClick={goToMovie}
          src={movie?.backdrop_path}
          alt={movie?.title || "Movie Poster"}
          className="h-40 w-full object-cover cursor-pointer"
        />

        {/* Rating badge */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 
                        bg-black/70 px-2 py-1 rounded-full text-xs text-white"
        >
          <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <p className="font-semibold text-white truncate">
          {movie?.title || "Untitled Movie"}
        </p>

        {/* Info */}
        <p className="text-xs text-gray-400 mt-1">
          {movie?.release_date
            ? new Date(movie.release_date).getFullYear()
            : "—"}
          {" · "}
          {movie?.genres
            ?.slice(0, 2)
            .map((g) => g.name)
            .join(" | ") || "Unknown"}
          {" · "}
          {movie?.runtime ? timeFormat(movie.runtime) : "—"}
        </p>

        {/* Action */}
        <button
          onClick={goToMovie}
          className="mt-4 w-full py-2 text-xs bg-primary 
                     hover:bg-primary-dull transition
                     rounded-full font-medium cursor-pointer"
        >
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
