import HomeButton from './HomeButton';
//---

function Main() {
  //! Main JSX
  return (
    <main className="flex flex-col items-center justify-center text-center">
      <section className="mt-28 px-5 text-slate-200">
        <h1 className="text-4xl font-bold sm:text-7xl"> آکادمی زبان لینگوهاب </h1>
        <h2 className="mt-8 font-mono text-lg font-semibold sm:text-2xl">
          اینجا زبان مزه دیگه ای می‌ده!😉{' '}
        </h2>
        <p className="mt-8 text-lg text-slate-200 sm:text-2xl">
          {' '}
          معلمان و استادان گرامی برای ادامه همکاری با مجموعه از طریق پیوند زیر به حساب کاربری خود
          وارد شوید{' '}
        </p>
      </section>
      <div className="mt-8">
        <HomeButton to={'/login'} className="rounded-lg px-5 py-3 text-lg">
          شروع همکاری
        </HomeButton>
      </div>
    </main>
  );
}

export default Main;
