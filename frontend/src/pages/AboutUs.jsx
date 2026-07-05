import HeroBackground from '../ui/HeroBackground';
import PageNav from '../ui/PageNav';
//---

function AboutUs() {
  return (
    <div className="overflow-y-hidden">
      <HeroBackground
        src={'/aboutus-bg.png'}
        placeholderSrc={
          'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/aboutus-bg.png?width=20&quality=20'
        }
      >
        <PageNav />
      </HeroBackground>
    </div>
  );
}

export default AboutUs;
