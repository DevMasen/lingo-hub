import { Link } from 'react-router';
//---

function Footer() {
  //! Main JSX
  return (
    <div className="flex flex-col items-center justify-center border-t border-[var(--color-slate-500)] px-3 text-[var(--color-slate-400)] md:flex-row md:justify-between">
      <ul className="hidden gap-5 md:flex">
        <li className="transition-all duration-100 hover:text-[var(--color-slate-100)]">
          <Link to="dashboard"> صفحه نخست </Link>
        </li>
        <li className="transition-all duration-100 hover:text-[var(--color-slate-100)]">
          <Link to="support"> پشتیبانی </Link>
        </li>
      </ul>

      <div className="text-sm"> تمام حقوق این وبسایت برای لینگوهاب محفوظ است.&copy;</div>
    </div>
  );
}

export default Footer;
