'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { initialState } from '@/hooks/useToast';

import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import NoticeMessage from './NoticeMessage';

const ToastProvider = () => {
  const [mount, setMount] = useState<boolean>(false);
  const toastList = useRecoilValue(initialState);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? (
    createPortal(
      <AnimatePresence>
        {toastList.length > 0 &&
          toastList.map((toast) => {
            return (
              <motion.div
                layout
                key={toast.key}
                className="fixed z-[999] top-[50px] w-full py-2 px-4 md:right-[5px] md:max-w-[350px] md:top-[65px] text-black"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {toast.type === 'success' && (
                  <SuccessMessage message={toast.message} />
                )}
                {toast.type === 'error' && (
                  <ErrorMessage message={toast.message} />
                )}
                {toast.type === 'notice' && (
                  <NoticeMessage message={toast.message} />
                )}
              </motion.div>
            );
          })}
      </AnimatePresence>,
      document.getElementById('notice-root') as HTMLElement
    )
  ) : (
    <></>
  );
};

export default ToastProvider;
