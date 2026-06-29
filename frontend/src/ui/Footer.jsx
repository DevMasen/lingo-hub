import { Link } from 'react-router';
//---

function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-[var(--color-slate-500)] px-3 text-[var(--color-slate-400)]">
      <ul className="flex gap-5">
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
