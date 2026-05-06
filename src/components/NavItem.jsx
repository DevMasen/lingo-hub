import { NavLink } from 'react-router';
import { Tooltip } from 'react-tooltip';
import { useSidebar } from '../context/SidebarContext';
///////////////////////////////////////

function NavItem({
  children,
  to = '',
  extraClasses = '',
  tooltipContent = '',
  onClick = () => {},
}) {
  const { isSidebarOpen } = useSidebar();
  return (
    <li>
      <NavLink
        className={`flex items-center gap-3 p-2 font-semibold text-slate-300 transition-all duration-300 ${extraClasses}`}
        onClick={onClick}
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
