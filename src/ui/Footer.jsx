import { Link } from 'react-router';

function Footer() {
  return (
    <div className="flex items-center justify-between px-3 text-slate-400">
      <ul className="flex gap-5">
        <li>
          <Link to="dashboard"> صفحه نخست </Link>
        </li>
        <li>
          <Link to="support"> پشتیبانی </Link>
        </li>
      </ul>

      <div> تمام حقوق این وبسایت برای هوش افزار نوآفرین محفوظ است.&copy;</div>
    </div>
  );
}

export default Footer;
