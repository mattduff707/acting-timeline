"use client";
import { colors } from "@/constants";
import { format } from "date-fns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ActorCard = ({ actor, color }: { actor: any; color: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRemove = (id: string) => {
    const newPath = pathname
      .split("/")
      .filter((param) => param !== id)
      .join("/");

    router.push(newPath.length !== 0 ? newPath : "/");
  };
  return (
    <div className=" flex gap-4 pr-4">
      {actor.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          width="240"
          height="360"
          style={{ borderColor: color }}
          className="h-auto w-[120px] self-center rounded-md border-[6px]"
        />
      ) : (
        <div
          style={{ borderColor: color }}
          className="grid h-[180px] w-[120px] place-items-center rounded-md border-[6px] bg-slate-400 text-center text-slate-800"
        >
          No
          <br />
          Poster
        </div>
      )}
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
        <button
          onClick={() => handleRemove(actor.id.toString())}
          className="mt-4 w-fit rounded-md px-1 font-semibold transition-colors after:block after:h-[2px] after:w-full after:bg-slate-400 after:content-[''] hover:border-b-0 hover:bg-slate-400 hover:text-slate-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ActorCard;
