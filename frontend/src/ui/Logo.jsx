import { NavLink } from 'react-router';

import Image from './Image';
//---

function Logo() {
  return (
    <div>
      <NavLink to="/" className="flex items-center justify-center gap-3">
        <Image
          src={
            'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png?width=64&quality=80'
          }
          placeholderSrc={
            'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png?width=20&quality=20'
          }
          alt={'logo'}
          className="w-16 rounded-lg"
        />

        {/* <img
          src="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png"
          alt="!Logo"
          className="w-16 rounded-lg"
        /> */}
        <h1 className="text-xl font-semibold"> لینگوهاب </h1>
      </NavLink>
    </div>
  );
}

export default Logo;
