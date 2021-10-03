import { atom } from 'recoil';

export const draggingState = atom<boolean>({
  key: 'draggingState',
  default: false,
});
