import React from "react";
import Timeline from "../../components/Timeline";
import { getYear } from "date-fns";
import MovieTooltip from "@/components/MovieTooltip";
import Overview from "./Overview";
import { colors } from "@/constants";

interface Props {
  params: {
    ids: string[];
  };
}

const Actor = async ({ params }: Props) => {
  const actorRes = await fetch(
    `http://localhost:3000/api/actor/details${params.ids.reduce(
      (acc, id) => `${acc}/${id}`,
      "",
    )}`,
    {
      method: "GET",
      cache: "no-cache",
    },
  );
  const actors = await actorRes.json();

  const actorsMovies = actors.reduce((acc: any[], actor: any, idx: number) => {
    return [
      ...acc,
      ...actor.movie_credits.cast.map((movie: any) => ({
        ...movie,
        color: colors[idx],
      })),
    ];
  }, []);

  const years = actorsMovies.reduce((acc: any, movie: any) => {
    const year = getYear(new Date(movie.release_date));
    if (!acc.includes(year) && !isNaN(year)) {
      return [...acc, year];
    }

    return acc;
  }, []);

  const sortedYears = years.sort();

  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const points = actorsMovies
    .map((movie: any) => {
      const date = new Date(movie.release_date);
      const rating = movie.vote_average;

      if (date.toString() === "Invalid Date") {
        return null;
      }

      return {
        x: date,
        y: rating,
        hoverComponent: <MovieTooltip movie={movie} />,
        color: movie.color,
      };
    })
    .filter((point: any) => point !== null);

  return (
    <section className="flex flex-1 flex-col overflow-auto bg-slate-800">
      <Overview actors={actors} />
      <Timeline
        points={points}
        x={{ values: sortedYears, label: "Release Date" }}
        y={{ values: ratings, label: "Rating" }}
      />
    </section>
  );
};

export default Actor;
