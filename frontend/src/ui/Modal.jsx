import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useLockScroll } from '../hooks/useLockScroll';
//---

//! Context
const ModalContext = createContext();

function Modal({ children }) {
  //! Local States
  const [openName, setOpenName] = useState('');

  //! Derived States
  const isModalOpen = openName.length > 0;

  //! Handlers
  const close = () => setOpenName('');
  const open = setOpenName;

  //! Custom Hooks
  useLockScroll(isModalOpen, 'modal');

  //! Main JSX
  return (
    <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
  );
}

function Open({ children, opens: openModalName }) {
  //! Context
  const { open } = useContext(ModalContext);

  //! Main JSX
  return cloneElement(children, {
    onOpenModal: () => open(openModalName),
  });
}

function Window({ children, name }) {
  //! Context
  const { openName, close } = useContext(ModalContext);

  //! Custom Hooks
  const ref = useOutsideClick(close);

  //! Conditional JSX
  if (openName !== name) return null;

  //! Main JSX
  return createPortal(
    <div className="fixed left-0 top-0 z-[1000] h-dvh w-full bg-slate-900/65 backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-[var(--color-slate-800)] px-[3.2rem] py-[3rem] text-[var(--color-slate-900)] backdrop-blur-3xl transition-all duration-500"
        ref={ref}
      >
        <button
          className="absolute right-[1.4rem] top-[0.5rem] translate-x-[0.8rem] rounded-md border-0 bg-none text-[var(--color-red-600)] transition-all duration-200 hover:bg-[var(--color-slate-600)]"
          onClick={close}
        >
          <HiXMark className="h-[2rem] w-[2rem]" />
        </button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
