import cx from 'classnames';
import noop from 'lodash-es/noop';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import styles from './FileCard.module.scss';

type FileCardProps = React.HTMLAttributes<HTMLDivElement> & {
  selected?: boolean;
  onClickAway?: (e: React.MouseEvent) => void;
};

const FileCard: React.FC<FileCardProps> = ({
  children,
  selected = false,
  onClickAway = noop,
  ...rest
}) => {
  const clickAwayRef = useRef<HTMLDivElement>(null);
  useClickAway(clickAwayRef, selected ? onClickAway : noop);

  return (
    <div
      className={cx(styles['file-card'], {
        [styles['file-card--selected']]: selected,
      })}
      ref={clickAwayRef}
      {...rest}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FileCard;
