import { Toast } from '@frontend/state/toastsState';
import { Icon } from '@iconify/react';
import cx from 'classnames';
import Col from '../atoms/Col';
import Row from '../atoms/Row';
import styles from './ToastCard.module.scss';

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

export default ToastCard;
