import { Link } from 'react-router';
//---

function HeaderButton({ children, onClick, to }) {
  //! Conditional JSX
  if (to)
    return (
      <Link to={to} className="z-40">
        {children}
      </Link>
    );

  //! Main JSX
  return (
    <button className="z-40" onClick={onClick}>
      {children}
    </button>
  );
}

export default HeaderButton;
