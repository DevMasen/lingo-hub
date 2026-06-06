import { Link } from 'react-router';
////////////////////////////////////
function HeaderButton({ children, onClick, to, tooltipId, tooltipContent }) {
  if (to)
    return (
      <Link
        to={'wallet'}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place="bottom"
        data-tooltip-variant="dark"
        data-tooltip-offset={10}
        data-tooltip-delay-show={800}
        data-tooltip-auto-close={3000}
        className="z-40"
      >
        {children}
      </Link>
    );

  return (
    <button
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      data-tooltip-place="bottom"
      data-tooltip-variant="dark"
      data-tooltip-offset={10}
      data-tooltip-delay-show={800}
      data-tooltip-auto-close={3000}
      className="z-40"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default HeaderButton;
