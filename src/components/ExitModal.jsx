import { Link } from 'react-router';

function ExitModal({ exitModalStatus = 'close', onExitModal }) {
  return (
    <div
      className={`fixed right-0 top-0 flex items-center justify-center bg-slate-600/40 backdrop-blur-sm transition-all duration-300 ${exitModalStatus === 'close' ? 'h-0 w-0' : 'h-dvh w-full'}`}
    >
      <div
        className={`${exitModalStatus === 'close' ? 'hidden' : 'flex'} w-[400px] flex-col items-center space-y-3 rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8`}
      >
        <h2 className="text-center text-2xl font-semibold">
          میخواهید از حساب کاربری خود خارج شوید؟
        </h2>
        <Link
          to="/"
          onClick={onExitModal}
          className="w-full rounded-lg bg-red-800 p-3 text-center text-lg font-medium text-slate-100 transition-all duration-300 hover:bg-red-700"
        >
          آره خارج شو!
        </Link>
        <Link
          to="/app"
          onClick={onExitModal}
          className="w-full rounded-lg bg-slate-800 p-3 text-center text-lg font-medium text-slate-100 transition-all duration-300 hover:bg-slate-900"
        >
          نه می‌مونم
        </Link>
      </div>
    </div>
  );
}

export default ExitModal;
