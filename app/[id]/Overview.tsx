import Image from "next/image";
import React from "react";

const Overview = ({ actors }: { actors: any[] }) => {
  //   console.log(actors[0]);
  const actorsWithAverage = actors.map((actor) => {
    const totalRating = actor.movie_credits.cast.reduce(
      (acc: number, movie: any) => acc + movie.vote_average,
      0,
    );
    const averageRating = totalRating / actor.movie_credits.cast.length;

    return { ...actor, averageRating };
  });
  return (
    <div className="py sticky left-0 flex px-8 pt-6">
      {actorsWithAverage.map((actor) => {
        return (
          <div
            key={actor.id}
            className=" flex gap-4 border-r-2 border-slate-500"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              width="240"
              height="360"
              className="h-auto w-[120px] rounded-md border-[6px] border-red-400"
            />
            <div className=""></div>
          </div>
        );
      })}
    </div>
  );
};

export default Overview;
