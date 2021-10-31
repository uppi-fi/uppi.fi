import { Icon } from '@iconify/react';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './SnackBar.module.scss';

export type SnackBarMessageType = 'error' | 'info' | 'success' | 'warning';

interface SnackBarProps {
  duration: number;
  message: string;
  title: string;
  /** @default 'info' */
  messageType: SnackBarMessageType;
}
/**
 * Neat Idea: When we integrate a state manager we can have a parent component that handles the display of notifications
 * instead of mounting them using reactDOM. Also we could use that container to render multiple notifications
 * at once.
 */
export default function SnackBar({
  duration,
  message,
  messageType = 'info',
  title,
}: SnackBarProps) {
  const [closeTimeout, setCloseTimeout] = useState<number>();

  useEffect(() => {
    beginCloseTimeout();
  }, []);

  const closeSnackBar = () => {
    clearTimeout(closeTimeout);
    const container = document.getElementById('snackbar-fixed-container');
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
  };

  const beginCloseTimeout = () => {
    if (duration) {
      const timeout = setTimeout(
        () => closeSnackBar(),
        duration
      ) as unknown as number;
      setCloseTimeout(timeout);
    }
  };

  return (
    <div
      className={cx(
        styles['snackbar-container'],
        styles[`${messageType}-container`]
      )}
      onMouseEnter={() => clearTimeout(closeTimeout)}
      onMouseLeave={() => beginCloseTimeout()}
    >
      <div>
        <div className={styles['snackbar-info-container']}>
          <div>
            <div
              className={cx(
                styles['snackbar-icon'],
                styles[`${messageType}-snackbar-icon`]
              )}
            ></div>
          </div>
          <div>
            <h5 className={styles['rubik-text']}>{title}</h5>
            <h5 className={styles['muted-rubik-text']}>{message}</h5>
          </div>
        </div>
        <div className={styles['close-icon']}>
          <Icon
            icon="ant-design:close-outlined"
            fontSize="14px"
            color="gray"
            onClick={() => closeSnackBar()}
          />
        </div>
      </div>
    </div>
  );
}
