import { toastsState } from '@frontend/state/toastsState';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import ToastCard from '../ToastCard';
import styles from './Toaster.module.scss';

/** Toast duration in milli-seconds */
const TOAST_DURATION = 4000;

function Toaster() {
  const [toasts, setToasts] = useRecoilState(toastsState);
  const [timeoutsById, setTimeoutsById] = useState<{
    [toastId: string]: number;
  }>({});

  const onCloseToast = (toastId: string) => {
    setToasts((old) => old.filter(({ id }) => id !== toastId));
  };

  useEffect(() => {
    for (const { id: toastId } of toasts) {
      if (toastId in timeoutsById) continue;

      const timeout = setTimeout(() => {
        setTimeoutsById((old) => {
          const newTimeoutsById = { ...old };
          delete newTimeoutsById[toastId];
          return newTimeoutsById;
        });
        setToasts((old) => old.filter(({ id }) => id !== toastId));
      }, TOAST_DURATION) as unknown as number;

      setTimeoutsById((old) => ({
        ...old,
        [toastId]: timeout,
      }));
    }
  }, [toasts]);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => {
        return (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => onCloseToast(toast.id)}
          />
        );
      })}
    </div>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('toasts')!
  );
}

export default Toaster;
