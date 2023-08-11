import React from 'react';

const MovieTooltip = ({ movie }: { movie: any }) => {
  return (
    <article className="flex flex-col w-full h-full py-2 px-4 bg-slate-700 text-slate-300">
      <header className=" border-b-2 border-slate-600 pb-2">
        <h2 className="text-center font-bold">{movie.original_title}</h2>
      </header>
      <div className="flex gap-2 h-full">
        <div className="grid place-items-center flex-[1]">
          <img className="w-[100px] h-auto" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
        </div>
        <div className="flex-[2] flex flex-col justify-center">
          <p>
            <span className="font-bold">Character:</span> {movie.character}
          </p>
          <p>
            <span className="font-bold">Release:</span> {movie.release_date}
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
