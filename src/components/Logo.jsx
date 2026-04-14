import { NavLink } from 'react-router';

function Logo() {
  return (
    <div>
      <NavLink to="/" className="flex items-center justify-center gap-2">
        <img src="/icon.png" alt="!Logo" className="w-10" />
        <h1 className="text-xl font-semibold">هوش افزار نوآفرین</h1>
      </NavLink>
    </div>
  );
}

export default Logo;
