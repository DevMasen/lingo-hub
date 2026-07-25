import HeroBackground from '../ui/HeroBackground';
import HomeButton from '../ui/HomeButton';
import PageNav from '../ui/PageNav';
//---

//! Global Const Variables
const aboutHighlights = [
  {
    title: 'هدف ما',
    body: 'ایجاد فضایی ساده و مطمئن برای یادگیری زبان و برنامه‌ریزی آموزشی.',
  },
  {
    title: 'خدمات',
    body: 'رزرو کلاس، دسترسی سریع به اطلاعات و تجربه‌ای روان برای همه کاربران.',
  },
  {
    title: 'تماس',
    body: 'برای هماهنگی و راهنمایی بیشتر، از ایمیل placeholder@lingohub.ir یا شماره ۰۹۱۲-۳۴۵-۶۷۸۹ استفاده کنید.',
  },
];

function AboutUs() {
  //! Main JSX
  return (
    <div className="w-full">
      <HeroBackground
        src={'/aboutus-bg.png'}
        placeholderSrc={
          'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/aboutus-bg.png?width=20&quality=20'
        }
      >
        <PageNav />
        <main className="flex min-h-full items-center justify-center px-4 pb-10 pt-6 sm:px-6 sm:pt-4">
          <section className="w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/15 bg-slate-800/70 p-6 shadow-2xl shadow-slate-950/35 backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold tracking-[0.3em] text-indigo-300">
                  درباره لینگوهاب
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">
                  آکادمی زبان لینگوهاب
                </h1>
                <p className="mt-4 text-base leading-8 text-slate-200/90 sm:text-lg">
                  یادگیری زبان باید ساده، روشن و بدون سردرگمی باشد.
                </p>
              </div>

              <HomeButton
                to="/login"
                className="w-full rounded-xl px-4 py-3 text-base font-semibold sm:w-auto"
              >
                شروع همکاری
              </HomeButton>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-right">
              <p className="text-sm leading-8 text-slate-300 sm:text-base">
                در لینگوهاب روی تجربه‌ای روان، برنامه‌ای واضح و ارتباط نزدیک تمرکز می‌کنیم تا هر
                کاربر سریع‌تر به هدفش برسد.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {aboutHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-right"
                >
                  <h2 className="text-lg font-semibold text-slate-100">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </HeroBackground>
    </div>
  );
}

export default AboutUs;
