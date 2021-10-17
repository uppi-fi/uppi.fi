import HeaderLeftPart from '../HeaderLeftPart';
import HeaderRightPart from '../HeaderRightPart';
import styles from './Header.module.scss';

interface HeaderProps {
  pageLoads: number | undefined;
}

function Header({ pageLoads }: HeaderProps) {
  return (
    <header className={styles.header}>
      <HeaderLeftPart />
      <HeaderRightPart pageLoads={pageLoads} />
    </header>
  );
}

export default Header;
