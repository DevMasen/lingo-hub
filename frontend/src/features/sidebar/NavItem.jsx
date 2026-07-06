import { NavLink } from 'react-router';
import { Tooltip } from 'react-tooltip';

import { useSidebar } from './SidebarContext';
//---

function NavItem({
  children,
  to = '',
  extraClasses = '',
  tooltipContent = '',
  onClick = () => {},
  onCloseModal,
}) {
  function handleClick(event) {
    if (onCloseModal) {
      event.preventDefault();
      event.stopPropagation();
      onCloseModal(event);
      return;
    }

    onClick(event);
  }
  //! Context Data
  const { isSidebarOpen } = useSidebar();

  //! JSX
  return (
    <li>
      <NavLink
        className={`flex items-center gap-3 p-2 font-semibold text-[var(--color-slate-300)] transition-all duration-300 ${extraClasses}`}
        onClick={handleClick}
        to={to}
        data-tooltip-id="navitem-tooltip"
        data-tooltip-content={tooltipContent}
        data-tooltip-place="left"
        data-tooltip-variant="dark"
        data-tooltip-offset={10}
        data-tooltip-delay-show={800}
        data-tooltip-auto-close={3000}
      >
        {children}
      </NavLink>
      {!isSidebarOpen && <Tooltip id="navitem-tooltip" />}
    </li>
  );
}

export default NavItem;
