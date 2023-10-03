import Image from "next/image";
import Link from "next/link";
import React from "react";

const ActorLink = ({
  onMouseDown,
  actor,
}: {
  onMouseDown: (e: React.MouseEvent, actor: any) => void;
  actor: any;
}) => {
  return (
    <Link
      className="flex items-center gap-4 p-2"
      onMouseDown={(e) => onMouseDown(e, actor)}
      href={`/${actor.id}`}
    >
      {actor.profile_path ? (
        <Image
          className="h-32 w-20"
          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
          alt={`headshot of ${actor.name}`}
          width={80}
          height={128}
        />
      ) : (
        <div className="flex h-32 w-20 items-center bg-slate-400 px-4 text-center opacity-70">
          No Picture
        </div>
      )}
      {actor.name}
    </Link>
  );
};

export default ActorLink;
