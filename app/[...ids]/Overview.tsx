import { colors } from "@/constants";
import { format } from "date-fns";
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
    <div className="py sticky left-0 flex gap-4 px-8 pt-6">
      {actorsWithAverage.map((actor, idx) => {
        return (
          <div key={actor.id} className=" flex gap-4 pr-4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              width="240"
              height="360"
              style={{ borderColor: colors[idx] }}
              className="h-auto w-[120px] self-center rounded-md border-[6px]"
            />
            <div className="text-slate-300">
              <h2 className="mb-2 border-b-2 border-slate-400 text-center text-xl font-bold">
                {actor.name}
              </h2>
              <p className="flex gap-2">
                <span className="shrink-0 font-semibold">Born: </span>
                {format(new Date(actor.birthday), "MM/dd/yyyy")},<br />
                {actor.place_of_birth}
              </p>
              {actor.deathday && (
                <p className="flex gap-2">
                  <span className="shrink-0 font-semibold">Died: </span>
                  {format(new Date(actor.deathday), "MM/dd/yyyy")}
                </p>
              )}
              <p className="flex gap-2">
                <span className="shrink-0 font-semibold">Avg. Rating: </span>
                {actor.averageRating.toFixed(1)}
              </p>
              <p className="flex gap-2">
                <span className="shrink-0 font-semibold">Popularity: </span>
                {actor.popularity.toFixed(1)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Overview;
