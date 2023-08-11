import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

const MovieTooltip = ({ movie }: { movie: any }) => {
  return (
    <article className="flex flex-col w-full h-full py-2 px-4 bg-slate-700 text-slate-300">
      <header className=" border-b-2 border-slate-600 pb-2">
        <h2 className="text-center font-bold">{movie.original_title}</h2>
      </header>
      <div className="flex gap-2 h-full">
        <div className="grid place-items-center flex-[1]">
          {movie.poster_path ? (
            <Image
              width="96"
              height="144"
              className="object-cover w-[96px] h-[144px]"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
          ) : (
            <div className="w-[96px] h-[144px] bg-slate-800 grid place-items-center text-center">
              No
              <br />
              Poster
            </div>
          )}
        </div>
        <div className="flex-[2] flex flex-col justify-center">
          <p>
            <span className="font-bold">Character:</span> {movie.character}
          </p>
          <p>
            <span className="font-bold">Release:</span> {format(new Date(movie.release_date), 'MM/dd/yyyy')}
          </p>
          <p>
            <span className="font-bold">Rating:</span> {movie.vote_average}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MovieTooltip;
