import { atom } from 'recoil';

export type ToastType = 'error' | 'info' | 'success' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

export const toastsState = atom<Toast[]>({
  key: 'toastsState',
  default: [],
});
