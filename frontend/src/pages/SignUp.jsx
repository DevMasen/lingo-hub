import SignupForm from '../features/authentication/SignupForm';

import Loader from '../ui/Loader';
import CloseFormButton from '../ui/CloseFormButton';
import HeroBackground from '../ui/HeroBackground';
//---

function SignUp() {
  const isLoading = false;

  //! JSX
  return (
    <HeroBackground
      src={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=1600&quality=80'
      }
      placeholderSrc={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=20&quality=20'
      }
    >
      <div className="flex h-dvh items-center justify-center px-5">
        {isLoading && <Loader />}
        <CloseFormButton />
        <SignupForm />
      </div>
    </HeroBackground>
  );
}

export default SignUp;
