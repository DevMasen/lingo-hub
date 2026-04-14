import { Link } from 'react-router';
import PageNav from '../components/PageNav';

function HomePage() {
  return (
    <div>
      <PageNav />
      <main className="flex flex-col items-center justify-center text-center">
        <section className="m-3 mt-36 text-slate-200">
          <h1 className="text-[58px] font-bold"> آکادمی زبان هوش افزار نوآفرین </h1>
          <p className="mt-6 text-xl text-slate-400">
            {' '}
            معلمان و استادان گرامی برای ادامه همکاری با مجموعه از طریق پیوند زیر به حساب کاربری خود
            وارد شوید{' '}
          </p>
        </section>
        <Link
          className="m-3 rounded-lg bg-slate-600 px-5 py-3 text-lg font-medium text-slate-200"
          to="/login"
        >
          {' '}
          شروع همکاری 🤝{' '}
        </Link>
      </main>
    </div>
  );
}

export default HomePage;
