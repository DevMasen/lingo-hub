import { useContext, useState, useEffect, useRef, createContext } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import HomeButton from './HomeButton';
//---

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [toggleElement, setToggleElement] = useState(null);
  const close = () => setOpenId('');

  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
        toggleElement,
        setToggleElement,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setToggleElement } = useContext(MenusContext);

  function handleToggle(e) {
    setToggleElement(e.currentTarget);

    if (openId === `${id}`) {
      close();
      return;
    }

    open(`${id}`);
  }

  return (
    <HomeButton className="rounded-lg p-1" onClick={handleToggle}>
      <HiEllipsisVertical className="h-[2rem] w-[2rem] text-slate-200" />
    </HomeButton>
  );
}

function List({ children, id }) {
  const { openId, close, toggleElement } = useContext(MenusContext);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (toggleElement && toggleElement.contains(e.target)) return;
      if (ref.current && !ref.current.contains(e.target)) close();
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [close, toggleElement]);

  if (openId !== `${id}`) return null;

  return createPortal(
    <ul
      className={`fixed left-8 top-[5.5rem] z-[100] rounded-md bg-slate-900/90 text-slate-200 shadow-md shadow-slate-500`}
      ref={ref}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        className="flex w-full items-center gap-[1.6rem] border-0 border-transparent bg-transparent bg-none px-[2.4rem] py-[1.2rem] text-left text-xl transition-all duration-[0.2s] hover:bg-slate-800/90"
        onClick={handleClick}
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end sm:hidden">{children}</div>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
