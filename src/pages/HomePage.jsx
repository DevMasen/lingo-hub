import { Link } from 'react-router';
import PageNav from '../components/PageNav';

function HomePage() {
  return (
    <div className="overflow-y-hidden">
      <PageNav />
      <main className="flex flex-col items-center justify-center text-center">
        <section className="mt-28 text-slate-200">
          <h1 className="text-6xl font-bold"> آکادمی زبان لینگوهاب </h1>
          <h2 className="mt-8 font-mono text-2xl font-semibold">
            اینجا زبان مزه دیگه ای می‌ده!😉{' '}
          </h2>
          <p className="mt-8 text-xl text-slate-400">
            {' '}
            معلمان و استادان گرامی برای ادامه همکاری با مجموعه از طریق پیوند زیر به حساب کاربری خود
            وارد شوید{' '}
          </p>
        </section>
        <Link
          className="mt-8 rounded-lg bg-slate-600 bg-opacity-65 px-5 py-3 text-lg font-medium text-slate-200"
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
