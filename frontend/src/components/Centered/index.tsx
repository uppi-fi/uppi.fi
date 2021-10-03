import cx from "classnames";
import styles from "./Centered.module.scss";

type CenteredProps = Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

const Centered: React.FC<CenteredProps> = ({ children, className }) => {
  return <div className={cx(styles.root, className)}>{children}</div>;
};

export default Centered;
