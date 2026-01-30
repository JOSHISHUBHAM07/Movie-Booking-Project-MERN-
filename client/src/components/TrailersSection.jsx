import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlueCircle from "./BlueCircle";
import { PlayCircleIcon } from "lucide-react";

const TrailersSection=()=> {
  const [currentTrailer,setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      <p className="text-gray-300 font-medium text-lg max-w-4xl mx-auto">
        Trailers
      </p>

      <div className="relative mt-6">
        {/* background decoration */}
        <BlueCircle top="-100px" right="-100px" className="-z-10" />

        {/* video container */}
        <div className="mx-auto max-w-4xl aspect-video bg-black relative z-10">
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </div>
        <div className="group grid grid-cols-4 gap-4 md:gap-4 mt-8 max-w-3xl mx-auto">
          {dummyTrailers.map((trailer) => (
            
            <div src={trailer.image} className="relative  group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer   " onClick={()=>setCurrentTrailer(trailer)} >
              <img
                src={trailer.image}
                className="rounded-lg w-full h-full object-cover brightness-75 "
              />
              <PlayCircleIcon
                strokeWidth={1.6}
                className="absolute -translate-x-0.5 -translate-y-0.5 top-0.5 leading-0.5 w-5 md:w-8 h-5 md:h-12 transform "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrailersSection;
