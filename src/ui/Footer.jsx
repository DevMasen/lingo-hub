import { Link } from 'react-router';

function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-slate-500 px-3 text-slate-400">
      <ul className="flex gap-5">
        <li className="transition-all duration-100 hover:text-slate-100">
          <Link to="dashboard"> صفحه نخست </Link>
        </li>
        <li className="transition-all duration-100 hover:text-slate-100">
          <Link to="support"> پشتیبانی </Link>
        </li>
      </ul>

      <div className="text-sm"> تمام حقوق این وبسایت برای هوش افزار نوآفرین محفوظ است.&copy;</div>
    </div>
  );
}

export default Footer;
