import React from 'react';

const MovieTooltip = ({ movie }: { movie: any }) => {
  return (
    <article className="flex flex-col w-[320px] h-[200px] p-4 bg-slate-500">
      <header>
        <h2 className="text-center">{movie.original_title}</h2>
      </header>
      <div className="flex">
        <div className="grid place-items-center">
          <img className="w-[100px] h-auto" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
        </div>
        <div>
          <p>Character: {movie.character}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </div>
    </article>
  );
};

export default MovieTooltip;
