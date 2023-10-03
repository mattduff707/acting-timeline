"use client";
import ActorCard from "@/components/ActorCard";
import { colors } from "@/constants";
import { format } from "date-fns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Overview = ({ actors }: { actors: any[] }) => {
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
        return <ActorCard key={actor.id} actor={actor} color={colors[idx]} />;
      })}
    </div>
  );
};

export default Overview;
