import SignupForm from '../features/authentication/SignupForm';

import Loader from '../ui/Loader';
import CloseFormButton from '../ui/CloseFormButton';
//---

function SignUp() {
  const isLoading = false;

  //! JSX
  return (
    <div className="background flex h-dvh items-center justify-center">
      {isLoading && <Loader />}
      <CloseFormButton />
      <SignupForm />
    </div>
  );
}

export default SignUp;
