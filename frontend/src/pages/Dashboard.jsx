import { useEffect } from 'react';
import { useFetcher, useLoaderData, useParams } from 'react-router';

import DashboardHeader from './DashboardHeader';
import Introduction from './Introduction';
import ReserveHistory from '../reserve/ReserveHistory';
import News from './News';

import { getNews } from '../../services/apiNews';

//! Global Styles
const sectionPartsStyles =
  'bg-[linear-gradient(45deg,var(--color-slate-800),var(--color-indigo-900))] rounded-lg border border-slate-500 p-3';

function Dashboard() {
  //! React Router
  const fetcher = useFetcher();
  const params = useParams();
  const news = useLoaderData();

  //! Effects
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle')
        fetcher.load(`/app/${params.userId}/setting/user`);
    },
    [fetcher, params.userId]
  );

  //! JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <DashboardHeader />
      <section className="grid grid-cols-[2fr_1fr] grid-rows-[auto_1fr] gap-4 p-4">
        <Introduction
          className={`${sectionPartsStyles} col-span-2 flex items-center gap-6 pl-9`}
          userFirstName={fetcher.data?.user.firstName}
        />
        <div>
          <ReserveHistory
            className={`${sectionPartsStyles} grid max-h-[20rem] min-h-[5rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
            userReservedRooms={fetcher.data?.user.reservedRooms}
          />
        </div>
        <div>
          <News
            news={news}
            className={`${sectionPartsStyles} grid max-h-[20rem] min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          />
        </div>
      </section>
    </div>
  );
}

export async function loader() {
  const news = await getNews();
  return news;
}

export default Dashboard;
