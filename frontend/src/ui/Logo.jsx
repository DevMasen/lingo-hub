import { NavLink } from 'react-router';
//---

function Logo() {
  return (
    <div>
      <NavLink to="/" className="flex items-center justify-center gap-3">
        <img
          src="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png"
          alt="!Logo"
          className="w-16 rounded-lg"
        />
        <h1 className="text-xl font-semibold"> لینگوهاب </h1>
      </NavLink>
    </div>
  );
}

export default Logo;
