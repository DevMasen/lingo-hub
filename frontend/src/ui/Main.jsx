import HomeButton from '../components/HomeButton';

function Main() {
  return (
    <main className="flex flex-col items-center justify-center text-center">
      <section className="mt-28 text-slate-200">
        <h1 className="text-7xl font-bold"> آکادمی زبان لینگوهاب </h1>
        <h2 className="mt-8 font-mono text-2xl font-semibold">اینجا زبان مزه دیگه ای می‌ده!😉 </h2>
        <p className="mt-8 text-xl text-slate-400">
          {' '}
          معلمان و استادان گرامی برای ادامه همکاری با مجموعه از طریق پیوند زیر به حساب کاربری خود
          وارد شوید{' '}
        </p>
      </section>
      <div className="mt-8">
        <HomeButton to={'login'} extraClasses={'px-5 py-3 text-lg rounded-lg'}>
          شروع همکاری
        </HomeButton>
      </div>
    </main>
  );
}

export default Main;
