import { Link, Outlet } from 'react-router';

function Setting() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <nav>
        <ul>
          <li>
            <Link to="user">اطلاعات کاربر</Link>
          </li>

          <Link to="password">تغییر پسورد</Link>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Setting;
