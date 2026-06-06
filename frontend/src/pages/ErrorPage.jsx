import { Link } from 'react-router';

import { BiHome } from 'react-icons/bi';

function ErrorPage() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-full flex-col items-center justify-center gap-3 bg-slate-600 text-3xl font-semibold text-red-500">
      <span> خطای سرور ⚠️ </span>
      <span className="tracking-wider"> Code 500 : Internal Server Error </span>
      <Link
        className="flex h-6 items-start justify-center gap-1 text-xl text-indigo-300 transition-colors duration-300 hover:border-b hover:border-indigo-100 hover:text-indigo-100"
        to={'/'}
      >
        <span>Home</span>
        <BiHome className="h-[1.25rem] w-[1.25rem]" />
      </Link>
    </div>
  );
}

export default ErrorPage;
