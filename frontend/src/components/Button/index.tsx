import cx from 'classnames';
import { PropsWithChildren } from 'react';
import { Link, LinkProps, LocationHook } from 'wouter';
import styles from './Button.module.scss';

type ButtonProps = { kind?: 'primary' | 'secondary' } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({
  children,
  kind,
  disabled,
  className,
  ...rest
}) => (
  <button
    {...rest}
    disabled={disabled}
    className={cx(
      styles['button'],
      {
        [styles['button--primary']]: kind === 'primary',
        [styles['button--secondary']]: kind === 'secondary',
        [styles['button--disabled']]: disabled,
      },
      className
    )}
  >
    {children}
  </button>
);

type LinkButtonProps = ButtonProps & PropsWithChildren<LinkProps<LocationHook>>;

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  kind,
  className,
  ...rest
}) => (
  <Link
    {...rest}
    className={cx(styles['button'], styles['button--' + kind], className)}
  >
    {children}
  </Link>
);

export default Button;
