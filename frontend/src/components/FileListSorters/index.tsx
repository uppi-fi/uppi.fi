import SortButton from '../SortButton';
import styles from './FileListSorters.module.scss';

function FileListSorters() {
  return (
    <div className={styles.sorters}>
      Järjestä
      <SortButton
        ascIcon="mdi:sort-calendar-ascending"
        descIcon="mdi:sort-calendar-descending"
        ascTooltip="Ajan mukaan: Vanhin eka"
        descTooltip="Ajan mukaan: Uusin eka"
        flipIcon
        type="date"
      />
      <SortButton
        ascIcon="cil:sort-numeric-down"
        descIcon="cil:sort-numeric-up"
        ascTooltip="Katsomiskerrat: Vähiten eka"
        descTooltip="Katsomiskerrat: Eniten eka"
        type="viewCount"
      />
    </div>
  );
}

export default FileListSorters;
