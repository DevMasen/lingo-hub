import { Outlet } from 'react-router';
import TabNavigation from '../ui/TabNavigation';
//---

//! Global Const Variables
const tabs = [
  { route: '/setting/user', routeName: 'پروفایل' },
  { route: '/setting/change-password', routeName: 'تغییر رمز عبور' },
];

function Setting() {
  //! Main JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <TabNavigation tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default Setting;
