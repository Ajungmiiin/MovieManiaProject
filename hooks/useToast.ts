import { Key } from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

export const initialState = atom<{ key: Key; message: string; type: string }[]>(
  {
    key: 'toastPopup',
    default: [],
  }
);

export const useToast = () => {
  const setToast = useSetRecoilState(initialState);

  const openToast = ({
    key,
    message,
    type,
  }: {
    key: Key;
    message: string;
    type: string;
  }) => {
    setToast((prev) => {
      return [...prev, { key, message, type }];
    });
  };

  const closeToast = (key: Key) => {
    setToast((prev) => {
      return prev.filter((item) => item.key !== key);
    });
  };

  const openAndCloseToast = (message: string, type: string) => {
    const key = Date.now();
    openToast({ key, message, type });
    setTimeout(() => closeToast(key), 2500);
  };

  const toast = {
    success: (message: string) => openAndCloseToast(message, 'success'),
    error: (message: string) => openAndCloseToast(message, 'error'),
    notice: (message: string) => openAndCloseToast(message, 'notice'),
  };

  return toast;
};
