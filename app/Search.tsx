'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEventHandler, useState } from 'react';
const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearchWhileTyping = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setQuery(event.currentTarget.value);
    const res = await fetch(`/api/search?query=${event.currentTarget.value}`, { method: 'GET' });

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
            console.log('BLUR');
            setFocused(false);
          }}
          onFocus={() => setFocused(true)}
          className="peer order-2 w-80 px-2 py-1 bg-slate-300 border-4 rounded-r-lg border-slate-500 outline-none font-semibold"
          value={query}
          onChange={handleSearchWhileTyping}
        />
        <span className="order-1 peer-focus:text-slate-300 peer-focus:bg-slate-500 transition-colors bg-slate-300 w-fit px-2 py-1 rounded-l-lg font-bold border-4 border-r-0 border-slate-500">
          Search Actor
        </span>
      </label>
      {showResults && (
        <div className="absolute  w-full px-4">
          <ul className="list-none bg-slate-300 w-full m-0 max-h-[600px] overflow-auto border-4 border-t-0 border-slate-500 rounded-b-lg">
            {results.map((actor: any) => (
              <li className="hover:bg-slate-400 cursor-pointer" key={actor.id}>
                <Link
                  className="p-2 flex items-center gap-4"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    console.log('HITTT');
                    router.push(`/${actor.id}`);
                  }}
                  href={`/${actor.id}`}
                >
                  {actor.profile_path ? (
                    <img
                      className="w-20 h-32"
                      src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                      alt={`headshot of ${actor.name}`}
                    />
                  ) : (
                    <div className="flex items-center w-20 h-32 bg-slate-400 opacity-70 px-4 text-center">
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
