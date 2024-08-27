'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modal.current?.showModal();
  }, []);

  return createPortal(
    <dialog
      ref={modal}
      className="p-6 w-[80%] rounded-md md:w-[60%]"
      onClose={() => onClose()}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
