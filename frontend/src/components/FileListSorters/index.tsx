import SortButton from '../SortButton';
import styles from './FileListSorters.module.scss';

function FileListSorters() {
  return (
    <div className={styles.sorters}>
      Järjestä
      <SortButton
        ascIcon="mdi:sort-calendar-ascending"
        descIcon="mdi:sort-calendar-descending"
        ascTooltip="Ajan mukaan: Vanhin ensin"
        descTooltip="Ajan mukaan: Uusin ensin"
        flipIcon
        type="date"
      />
      <SortButton
        ascIcon="cil:sort-numeric-down"
        descIcon="cil:sort-numeric-up"
        ascTooltip="Katsomiskerrat: Vähiten ensin"
        descTooltip="Katsomiskerrat: Eniten ensin"
        type="viewCount"
      />
    </div>
  );
}

export default FileListSorters;
