"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { ChangeEventHandler, useState } from "react";
const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearchWhileTyping = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    setQuery(event.currentTarget.value);
    const res = await fetch(`/api/search?query=${event.currentTarget.value}`, {
      method: "GET",
    });

    const actors = await res.json();

    setResults(actors.results);
    setLoading(false);
  };

  const showResults = results.length > 0 && query.length > 0 && focused;

  return (
    <div className="relative">
      <label className="flex text-slate-700">
        <input
          onBlur={() => {
            console.log("BLUR");
            setFocused(false);
          }}
          onFocus={() => setFocused(true)}
          className="peer order-2 w-80 rounded-r-lg border-4 border-slate-500 bg-slate-300 px-2 py-1 font-semibold outline-none"
          value={query}
          onChange={handleSearchWhileTyping}
        />
        <span className="order-1 w-fit rounded-l-lg border-4 border-r-0 border-slate-500 bg-slate-300 px-2 py-1 font-bold transition-colors peer-focus:bg-slate-500 peer-focus:text-slate-300">
          Search Actor
        </span>
      </label>
      {showResults && (
        <div className="absolute  w-full px-4">
          <ul className="m-0 max-h-[600px] w-full list-none overflow-auto rounded-b-lg border-4 border-t-0 border-slate-500 bg-slate-300">
            {results.map((actor: any) => (
              <li className="cursor-pointer hover:bg-slate-400" key={actor.id}>
                <Link
                  className="flex items-center gap-4 p-2"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    console.log("HITTT");
                    router.push(`${pathname}/${actor.id}`);
                  }}
                  href={`/${actor.id}`}
                >
                  {actor.profile_path ? (
                    <img
                      className="h-32 w-20"
                      src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                      alt={`headshot of ${actor.name}`}
                    />
                  ) : (
                    <div className="flex h-32 w-20 items-center bg-slate-400 px-4 text-center opacity-70">
                      No Picture
                    </div>
                  )}
                  {actor.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
