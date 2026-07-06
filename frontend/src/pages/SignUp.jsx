import SignupForm from '../features/authentication/SignupForm';
import CloseFormButton from '../ui/CloseFormButton';
import HeroBackground from '../ui/HeroBackground';
//---

function SignUp() {
  //! JSX
  return (
    <HeroBackground
      src={'/home-bg.png'}
      placeholderSrc={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=20&quality=20'
      }
    >
      <div className="flex h-dvh items-center justify-center px-5">
        <CloseFormButton />
        <SignupForm />
      </div>
    </HeroBackground>
  );
}

export default SignUp;
