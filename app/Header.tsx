import React from 'react';
import Search from './Search';

const Header = () => {
  return (
    <header className="flex-1 flex gap-4 items-center w-fit justify-center px-4 bg-slate-700 grow-1 max-h-24 border-b-4 border-r-4 rounded-br-lg border-slate-600 shadow-header z-10">
      {/* <h1 className="text-slate-200 text-3xl">Acting Timeline</h1> */}
      <Search />
    </header>
  );
};

export default Header;
