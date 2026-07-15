import { Outlet } from 'react-router';

import TabNavigation from '../ui/TabNavigation';
//---

function Setting() {
  const tabs = [
    { route: '/setting/user', routeName: 'پروفایل' },
    { route: '/setting/change-password', routeName: 'تغییر رمز عبور' },
  ];

  //! JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <TabNavigation tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default Setting;
