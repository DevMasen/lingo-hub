import { Link } from 'react-router';
//---

function LinkItem({ children, to, onClick, className }) {
  return (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export default LinkItem;
