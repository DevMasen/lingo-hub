import PageNav from '../ui/PageNav';
import Main from '../ui/Main';
import HeroBackground from '../ui/HeroBackground';
//---

function HomePage() {
  return (
    <HeroBackground
      src={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=1600&quality=80'
      }
      placeholderSrc={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=20&quality=20'
      }
    >
      <PageNav />
      <Main />
    </HeroBackground>
  );
}

export default HomePage;
