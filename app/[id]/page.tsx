import React from 'react';
import Timeline from '../../components/Timeline';

interface Props {
  params: {
    id: string;
  };
}

const Actor = async ({ params }: Props) => {
  const actorRes = await fetch(`http://localhost:3000/api/actor/${params.id}/details`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const actor = await actorRes.json();
  const years = actor.movie_credits.cast.reduce((acc: any, movie: any) => {
    const year = parseInt(movie.release_date.split('-')[0]);
    if (!acc.includes(year) && !isNaN(year)) {
      return [...acc, year];
    }

    return acc;
  }, []);

  const sortedYears = years.sort();
  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const points = actor.movie_credits.cast
    .map((movie: any) => {
      const year = parseInt(movie.release_date.split('-')[0]);
      const rating = movie.vote_average;
      if (isNaN(year)) {
        return null;
      }

      return {
        x: year,
        y: rating,
        label: movie.title,
      };
    })
    .filter((point: any) => point !== null);

  return (
    <section className="flex-1 bg-slate-800 overflow-auto">
      <Timeline points={points} x={sortedYears} y={ratings} />
    </section>
  );
};

export default Actor;
