import { Link } from 'react-router';

import { HiOutlineHome } from 'react-icons/hi';
//---

function PageNotFound() {
  return (
    <div
      dir="ltr"
      className="flex h-dvh flex-col items-center justify-center gap-4 bg-[var(--color-slate-900)]"
    >
      <span className="text-5xl text-[var(--color-slate-100)]">404 : Not Found!</span>
      <Link to="/home" className="flex items-start gap-1 text-xl text-[var(--color-slate-400)]">
        <HiOutlineHome />
        <span>Return Home</span>
      </Link>
    </div>
  );
}

export default PageNotFound;
