import Main from '../ui/Main';
import PageNav from '../components/PageNav';

function HomePage() {
  return (
    <div className="background overflow-y-hidden">
      <PageNav />
      <Main />
    </div>
  );
}

export default HomePage;
