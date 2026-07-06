import { cloneElement, createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import { useOutsideClick } from '../hooks/useOutsideClick';
//---

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  useEffect(
    function () {
      if (openName.length > 0) document.body.classList.add('overflow-hidden');
      else document.body.classList.remove('overflow-hidden');
    },
    [openName]
  );

  return (
    <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
  );
}

function Open({ children, opens: openModalName }) {
  const { open } = useContext(ModalContext);

  const handleOpen = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    open(openModalName);
  };

  return cloneElement(children, {
    onOpenModal: handleOpen,
    onCloseModal: handleOpen,
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[1000] h-dvh w-full bg-slate-900/65 backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-[var(--color-slate-700)] px-[3.2rem] py-[3rem] shadow-md shadow-[var(--color-slate-700)] transition-all duration-500"
        ref={ref}
      >
        <button
          className="absolute right-[1.4rem] top-[0.5rem] translate-x-[0.8rem] rounded-md border-0 bg-none text-[var(--color-red-600)] transition-all duration-200 hover:bg-[var(--color-slate-600)]"
          onClick={close}
        >
          <HiXMark className="h-[2rem] w-[2rem]" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
