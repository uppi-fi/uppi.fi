import { Icon } from '@iconify/react';
import { Link, LinkProps } from 'wouter';
import styles from './BackButton.module.scss';
import cx from 'classnames';

const BackButton: React.FC = ({ children }) => (
  <button className={styles.backbutton}>
    <Icon icon="bx:bxs-left-arrow" />
    {children}
  </button>
);

export const BackButtonLink: React.FC<LinkProps> = ({
  children,
  className,
  ...rest
}) => (
  <Link {...rest} className={cx(styles.backbutton, className)}>
    <Icon icon="bx:bxs-left-arrow" />
    {children}
  </Link>
);

export default BackButton;
