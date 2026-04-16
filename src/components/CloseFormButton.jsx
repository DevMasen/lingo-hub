import { Link } from 'react-router';

function CloseFormButton() {
  return (
    <Link
      className="fixed right-7 top-6 flex h-4 w-4 cursor-pointer items-center justify-center font-serif text-4xl font-semibold text-red-700"
      to="/"
    >
      &times;
    </Link>
  );
}

export default CloseFormButton;
