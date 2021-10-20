import { Icon } from '@iconify/react';
import cx from 'classnames';
import Tooltip from 'rc-tooltip';
import { CSSProperties } from 'react';
import { useRecoilState } from 'recoil';
import {
  FileListSortState,
  fileListSortState,
} from '../../state/fileList/fileListSortState';
import styles from './SortButton.module.scss';

interface SortButtonProps {
  type: FileListSortState['type'];
  ascIcon: string;
  descIcon: string;
  ascTooltip: string;
  descTooltip: string;
  flipIcon?: boolean;
  style?: CSSProperties;
}

function SortButton({
  ascIcon,
  descIcon,
  ascTooltip,
  descTooltip,
  flipIcon,
  type,
}: SortButtonProps) {
  const [currentSorter, setCurrentSorter] = useRecoilState(fileListSortState);
  const tooltip = currentSorter.order === 'asc' ? ascTooltip : descTooltip;
  const isCurrentSorter = currentSorter.type === type;

  return (
    <Tooltip
      placement="top"
      overlay={tooltip}
      mouseLeaveDelay={0}
      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
    >
      <button
        className={cx(styles['clear-button'], styles['sort-padding'])}
        onClick={() =>
          setCurrentSorter((old) => {
            if (old.type !== type) {
              return {
                ...old,
                type,
              };
            }

            return {
              ...old,
              order: old.order === 'asc' ? 'desc' : 'asc',
            };
          })
        }
      >
        <Icon
          className={cx(styles.icon, {
            [styles.active]: isCurrentSorter,
          })}
          hFlip={flipIcon}
          icon={currentSorter.order === 'asc' ? ascIcon : descIcon}
          style={{ height: '28px', width: '28px' }}
        />
      </button>
    </Tooltip>
  );
}

export default SortButton;
