import { Link } from 'react-router';
//---

function CloseFormButton() {
  return (
    <Link
      className="fixed right-7 top-6 flex h-4 w-4 cursor-pointer items-center justify-center font-serif text-5xl font-semibold text-red-600 transition-transform duration-200 hover:translate-y-[-0.25rem]"
      to="/home"
    >
      &times;
    </Link>
  );
}

export default CloseFormButton;
