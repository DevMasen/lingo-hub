import { useDarkMode } from '../../context/DarkModeContext';
import HeaderButton from './HeaderButton';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const iconStyles =
  'h-8 w-8 rounded-xl p-1 text-[var(--color-slate-200)] transition-all duration-300 hover:bg-[var(--color-slate-700)] hover:text-[var(--color-indigo-700)]';

function ToggleDarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="relative flex items-center">
      <HeaderButton onClick={toggleDarkMode}>
        {isDarkMode ? (
          <HiOutlineSun className={iconStyles} />
        ) : (
          <HiOutlineMoon className={iconStyles} />
        )}
      </HeaderButton>
    </div>
  );
}

export default ToggleDarkMode;
