import { Icon } from '@iconify/react';
import cx from 'classnames';
import Tooltip from 'rc-tooltip';
import React from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps extends React.ComponentProps<typeof Icon> {
  label?: string;
  tooltip?: string | JSX.Element;
  tooltipPlacement?: string;
  onClick?: () => void;
}

function IconButton(props: IconButtonProps) {
  const {
    tooltip,
    tooltipPlacement = 'bottom',
    onClick,
    label,
    ...iconProps
  } = props;

  const renderButton = () => (
    <button className={styles.button} onClick={onClick}>
      <Icon {...iconProps} className={cx(styles.icon, props.className)} />
      <div className={styles.text}>{label}</div>
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip
        placement={tooltipPlacement}
        overlay={tooltip}
        mouseLeaveDelay={0}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
      >
        {renderButton()}
      </Tooltip>
    );
  }

  return renderButton();
}

export default IconButton;
