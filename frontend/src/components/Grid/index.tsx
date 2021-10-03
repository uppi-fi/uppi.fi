import cx from "classnames";
import styles from "./Flex.module.scss";

export type FlexProps = Pick<
  React.CSSProperties,
  | "gap"
  | "columnGap"
  | "rowGap"
  | "justifyContent"
  | "justifyItems"
  | "justifySelf"
  | "alignContent"
  | "alignItems"
  | "alignSelf"
  | "gridTemplateColumns"
  | "gridTemplateRows"
  | "gridAutoRows"
  | "gridAutoColumns"
> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

const Grid: React.FC<FlexProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cx(styles.root, className)} style={rest}>
      {children}
    </div>
  );
};

export default Grid;
