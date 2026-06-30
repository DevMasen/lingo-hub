import { useSearchParams } from 'react-router';

import UserInfoHeader from './UserInfoHeader';
import UserParameterList from './UserParameterList';
import UserReserveList from './UserReserveList';
//---

function UserInfo() {
  //! React Router
  const [query] = useSearchParams();

  //TODO : replace with real data
  //! Fake Data
  const user = {
    firstName: 'علی',
    lastName: 'سیدی',
    phoneNumber: '۹۱۶۲۰۸۶۶۱۴',
    language: 'انگلیسی',
    level: 'مبتدی',
    explanation: '',
    email: 'ali@gmail.com',
    signupStatus: 'confirmed',
    reservedRooms: [
      {
        id: 1,
        roomName: '104',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 2,
        status: 'reserved',
      },
      {
        id: 2,
        roomName: '100',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 5,
        status: 'canceled',
      },
      {
        id: 3,
        roomName: '101',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 1,
        status: 'reserved',
      },
      {
        id: 4,
        roomName: '103',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 8,
        status: 'reserved',
      },
      {
        id: 5,
        roomName: '100',
        date: '۱۴۰۵۰۲۲۴',
        timePart: 2,
        status: 'waiting',
      },
      {
        id: 6,
        roomName: '100',
        date: '۱۴۰۵۰۲۲۴',
        timePart: 4,
        status: 'waiting',
      },
    ],
    creditBalance: 0,
    maxReserveCount: 3,
    id: 2,
  };
  const date = {
    reserveDate: '۱۴۰۵۰۳۱۸',
  };

  //! JSX
  return (
    <div className="space-y-5 border-b border-[var(--color-slate-500)] p-3">
      <UserInfoHeader user={user} />
      <section className="space-y-7 rounded-2xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] px-5 py-2">
        <UserParameterList user={user} date={date} query={query} />
        <UserReserveList user={user} date={date} query={query} />
      </section>
    </div>
  );
}

export default UserInfo;
