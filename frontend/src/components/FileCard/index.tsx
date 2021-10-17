import styles from './FileCard.module.scss';
import cx from 'classnames';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import { noop } from 'lodash';

type FileCardProps = React.HTMLAttributes<HTMLDivElement> & {
  selected?: boolean;
  onClickAway?: (e: MouseEvent) => void;
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
