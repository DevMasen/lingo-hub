import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="relative flex gap-2 rounded-lg border border-slate-500 px-3 py-2 transition-all duration-300 focus-within:border-indigo-700">
      <label htmlFor="search-bar" className="cursor-pointer">
        <HiOutlineSearch className="h-6 w-6 text-slate-500 transition-colors duration-300 hover:text-slate-300" />
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
        maxlength="20"
        className="bg-inherit outline-none"
      />
      <div
        className={`absolute right-0 top-12 flex items-center justify-center rounded-lg border border-slate-500 bg-gray-900 transition-all duration-75 ${searchQuery ? 'h-64 w-96 border' : 'h-0 w-0 border-0'}`}
      >
        {searchQuery && <p className="text-xl text-slate-400"> نتیجه ای یافت نشد! </p>}
      </div>
    </div>
  );
}

export default SearchBar;
