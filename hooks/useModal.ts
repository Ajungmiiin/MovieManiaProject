import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const modalInitialState = atom<boolean>({
  key: 'modal',
  default: false,
});

export const useModal = () => {
  const setModal = useSetRecoilState(modalInitialState);
  const modal = useRecoilValue(modalInitialState);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return { openModal, closeModal, modal };
};
