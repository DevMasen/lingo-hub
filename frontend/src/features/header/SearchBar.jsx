import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import HeaderOverlay from './HeaderOverlay';
//---

function SearchBar() {
  //! Local States
  const [searchQuery, setSearchQuery] = useState('');

  //! Main JSX
  return (
    <>
      {searchQuery.length > 0 && <HeaderOverlay />}
      <div
        className={`relative flex gap-2 rounded-lg border border-[var(--color-slate-500)] px-3 py-2 transition-all duration-300 focus-within:border-[var(--color-indigo-700)] ${searchQuery.length > 0 && 'z-[800]'}`}
      >
        <label htmlFor="search-bar" className="cursor-pointer">
          <HiOutlineSearch className="h-6 w-6 text-[var(--color-slate-500)] transition-colors duration-300 hover:text-[var(--color-slate-300)]" />
        </label>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو"
          required
          aria-required="true"
          maxLength="20"
          className="w-full bg-inherit outline-none"
        />
        <div
          className={`absolute right-0 top-12 z-20 flex items-center justify-center rounded-lg border border-[var(--color-slate-500)] bg-[var(--color-slate-800)] transition-all duration-75 ${searchQuery ? 'h-48 w-80 border sm:h-64 sm:w-96' : 'h-0 w-0 border-0'}`}
        >
          {searchQuery && (
            <p className="text-xl text-[var(--color-slate-400)]"> نتیجه ای یافت نشد! </p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
