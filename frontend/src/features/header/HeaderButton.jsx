import { Link } from 'react-router';
//---

function HeaderButton({ children, onClick, to }) {
  if (to)
    return (
      <Link to={to} className="z-40">
        {children}
      </Link>
    );

  return (
    <button className="z-40" onClick={onClick}>
      {children}
    </button>
  );
}

export default HeaderButton;
