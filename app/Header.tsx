import React from 'react';
import Search from './Search';

const Header = () => {
  return (
    <header className="flex-1 flex items-center justify-center bg-slate-700 grow-1 max-h-48 border-b-2 border-slate-600 shadow-header z-10">
      <Search />
    </header>
  );
};

export default Header;
