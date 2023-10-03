"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { ChangeEventHandler, useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Spinner from "@/components/Spinner";
const Search = () => {
  const pathname = usePathname();
  const splitPath = pathname.split("/").filter((seg) => seg);
  // console.log(splitPath);
  const isDisabled = splitPath.length === 4;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearchWhileTyping = async (val: string) => {
    const res = await fetch(`/api/search?query=${val}`, {
      method: "GET",
    });

    const actors = await res.json();

    setResults(actors.results);
    setLoading(false);
  };
  const debouncedSearch = useDebounce(() => {
    handleSearchWhileTyping(query);
  }, 500);

  const showResults = results.length > 0 && focused && !loading;

  return (
    <div className="relative">
      <label className="flex text-slate-700">
        <input
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => setFocused(true)}
          className="peer order-2 w-80 rounded-r-lg border-4 border-slate-500 bg-slate-300 px-2 py-1 font-semibold outline-none"
          value={query}
          onChange={(e) => {
            setLoading(true);
            setQuery(e.target.value);
            debouncedSearch();
          }}
        />
        <span className="order-1 w-fit rounded-l-lg border-4 border-r-0 border-slate-500 bg-slate-300 px-2 py-1 font-bold transition-colors peer-focus:bg-slate-500 peer-focus:text-slate-300">
          Search Actor
        </span>
      </label>
      {loading && (
        <div className="absolute w-full px-4">
          <div className="grid h-[600px] w-full place-items-center bg-slate-300">
            <Spinner />
          </div>
        </div>
      )}
      {showResults && (
        <div className="absolute  w-full px-4">
          <ul className="m-0 max-h-[600px] w-full list-none overflow-auto rounded-b-lg border-4 border-t-0 border-slate-500 bg-slate-300">
            {results.map((actor: any) => (
              <li className="cursor-pointer hover:bg-slate-400" key={actor.id}>
                <Link
                  className="flex items-center gap-4 p-2"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    if (splitPath.length === 0) {
                      router.push(`/${actor.id}`);
                    } else {
                      console.log(splitPath.join("/"));
                      router.push(`/${splitPath.join("/")}/${actor.id}`);
                    }
                    // setQuery("");
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
