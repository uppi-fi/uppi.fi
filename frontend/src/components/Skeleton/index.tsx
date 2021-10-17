import styles from './Skeleton.module.scss';
import cx from 'classnames';

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties | undefined;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Skeleton: React.FC<SkeletonProps> = ({ className, style, ...rest }) => {
  return (
    <div
      className={cx(styles.skeleton, className)}
      style={style}
      {...rest}
    ></div>
  );
};

export default Skeleton;
