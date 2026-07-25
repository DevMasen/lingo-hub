import { useContext, useState, useEffect, useRef, createContext } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import HomeButton from './HomeButton';
//---

//! Context
const MenusContext = createContext();

function Menus({ children }) {
  //! Local States
  const [openId, setOpenId] = useState('');
  const [toggleElement, setToggleElement] = useState(null);

  //! Handlers
  const close = () => setOpenId('');
  const open = setOpenId;

  //! Main JSX
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
  //! Context
  const { openId, close, open, setToggleElement } = useContext(MenusContext);

  //! Handlers
  function handleToggle(e) {
    setToggleElement(e.currentTarget);

    if (openId === `${id}`) {
      close();
      return;
    }

    open(`${id}`);
  }

  //! Main JSX
  return (
    <HomeButton className="rounded-lg p-1" onClick={handleToggle}>
      <HiEllipsisVertical className="h-[1.75rem] w-[1.75rem] text-slate-200" />
    </HomeButton>
  );
}

function List({ children, id }) {
  //! Local States
  const ref = useRef(null);

  //! Context
  const { openId, close, toggleElement } = useContext(MenusContext);

  //! Effects
  useEffect(() => {
    function handleClick(e) {
      if (toggleElement && toggleElement.contains(e.target)) return;
      if (ref.current && !ref.current.contains(e.target)) close();
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [close, toggleElement]);

  //! Conditional JSX
  if (openId !== `${id}`) return null;

  //! Main JSX
  return createPortal(
    <ul
      className={`fixed left-8 top-[5.5rem] z-[100] rounded-md bg-slate-900/90 text-slate-200`}
      ref={ref}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  //! Context
  const { close } = useContext(MenusContext);

  //! Handlers
  function handleClick() {
    onClick?.();
    close();
  }

  //! Main JSX
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
  //! Main JSX
  return <div className="flex items-center justify-end sm:hidden">{children}</div>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
