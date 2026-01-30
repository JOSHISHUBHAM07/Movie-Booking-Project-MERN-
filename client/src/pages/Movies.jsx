import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlueCircle from "../components/BlueCircle";

const Movies = () => {
  if (!dummyShowsData || dummyShowsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center">No Movies Available</h1>
      </div>
    );
  }

  return (
    <div className="   my-40 mx-60 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlueCircle top="150px" left="0px" />
      <BlueCircle bottom="150px" right="0px" />

      <h1 className="text-lg font-medium my-4">Now Showing</h1>

      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
