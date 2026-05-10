import { NavLink } from 'react-router';
///////////////////////////////////////

function Logo() {
  return (
    <div>
      <NavLink to="/" className="flex items-center justify-center gap-3">
        <img src="/icon3.jpg" alt="!Logo" className="w-16 rounded-lg" />
        <h1 className="text-xl font-semibold">هوش افزار نوآفرین</h1>
      </NavLink>
    </div>
  );
}

export default Logo;
