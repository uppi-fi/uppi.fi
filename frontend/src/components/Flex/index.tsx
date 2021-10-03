import cx from "classnames";
import styles from "./Flex.module.scss";

export type FlexProps = Pick<
  React.CSSProperties,
  | "gap"
  | "justifyContent"
  | "justifyItems"
  | "justifySelf"
  | "alignContent"
  | "alignItems"
  | "alignSelf"
  | "flexDirection"
> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

const Flex: React.FC<FlexProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cx(styles.root, className)} style={rest}>
      {children}
    </div>
  );
};

export default Flex;
