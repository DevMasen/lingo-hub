import HeroBackground from '../ui/HeroBackground';
import PageNav from '../ui/PageNav';
//---

//TODO#2: generate this page using AI with a placeholder data
function AboutUs() {
  //! Main JSX
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
