import { toastsState, ToastType } from '@frontend/state/toastsState';
import { useSetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';

type Toast = (title: string, message?: string) => void;

export function useToast() {
  const setToastsState = useSetRecoilState(toastsState);

  const addToast = (type: ToastType, title: string, message?: string) => {
    setToastsState((old) => [
      ...old,
      {
        id: uuid(),
        type,
        title,
        message,
      },
    ]);
  };

  const error: Toast = (title, message) => addToast('error', title, message);
  const info: Toast = (title, message) => addToast('info', title, message);
  const warning: Toast = (title, message) =>
    addToast('warning', title, message);
  const success: Toast = (title, message) =>
    addToast('success', title, message);

  return { error, info, warning, success };
}
