'use client';
import React, { ChangeEventHandler, useState } from 'react';
const Search = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchWhileTyping = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setQuery(event.currentTarget.value);
    const res = await fetch(`/api/search?query=${event.currentTarget.value}`, { method: 'GET' });

    const actors = await res.json();

    setResults(actors.results);
    setLoading(false);
  };

  const showResults = results.length > 0 && query.length > 0;

  return (
    <div className="relative">
      <input className="w-80" value={query} onChange={handleSearchWhileTyping} />
      {showResults && (
        <ul className="list-none bg-slate-300 w-full m-0 absolute max-h-[600px] overflow-auto">
          {results.map((actor: any) => (
            <li className="p-2 flex items-center gap-4 hover:bg-slate-400 cursor-pointer" key={actor.id}>
              {actor.profile_path ? (
                <img
                  className="w-20 h-32"
                  src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                  alt={`headshot of ${actor.name}`}
                />
              ) : (
                <div className="flex items-center w-20 h-32 bg-slate-400 opacity-70 px-4 text-center">No Picture</div>
              )}
              {actor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
