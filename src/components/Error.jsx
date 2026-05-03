import { Link } from 'react-router';

function Error({ error = '', toPath = '' }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-md bg-red-800 p-3 text-red-100">
      <span>خطا : {error}</span>
      {toPath.length > 0 && (
        <span className="flex gap-1">
          <span>لطفا ابتدا</span>
          <Link
            to={toPath}
            className="border-indigo-400 font-semibold text-indigo-300 transition-colors duration-300 hover:border-b hover:text-indigo-400"
          >
            ثبت‌نام کنید
          </Link>
        </span>
      )}
    </div>
  );
}

export default Error;
