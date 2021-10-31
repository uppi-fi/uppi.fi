import { useToast } from '@frontend/services/useToast';
import { Toast, toastsState } from '@frontend/state/toastsState';
import { Icon } from '@iconify/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Col from '../atoms/Col';
import Row from '../atoms/Row';
import styles from './Toaster.module.scss';

/** Toast duration in milli-seconds */
const TOAST_DURATION = 4000;

interface ToastCardProps {
  toast: Toast;
  onClose: () => void;
}

function ToastCard({
  toast: { title, type, message },
  onClose,
}: ToastCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return 'ant-design:warning-twotone';
      case 'info':
        return 'ant-design:info-circle-twotone';
      case 'success':
        return 'ant-design:check-circle-twotone';
      case 'warning':
        return 'ant-design:warning-twotone';
    }
  };
  return (
    <div
      className={cx(styles.toastCard, {
        [styles[type]]: true,
      })}
    >
      <div className={styles.close} onClick={onClose}>
        <Icon icon="ant-design:close-outlined" />
      </div>
      <Row alignItems="center" gap="16px">
        <Icon icon={getIcon()} className={styles.icon} />
        <Col gap="4px">
          <div className={styles.title}>{title}</div>
          <div className={styles.message}>{message}</div>
        </Col>
      </Row>
    </div>
  );
}

function Toaster() {
  const [toasts, setToasts] = useRecoilState(toastsState);
  const { success, warning, error, info } = useToast();
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

  return (
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
    </div>
  );
}

export default Toaster;
