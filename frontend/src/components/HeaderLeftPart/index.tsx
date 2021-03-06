import { useCurrentUser } from '@frontend/services/useCurrentUser';
import { Link } from 'wouter';
import logo from '../../assets/images/logo.png';
import Row from '../atoms/Row';
import styles from './HeaderLeftPart.module.scss';

function HeaderLeftPart() {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return (
      <Row alignItems="center">
        <img className={styles.logo} src={logo} alt="uppi.fi" />
        <h1>uppi.fi</h1>
      </Row>
    );
  }

  return (
    <Row alignItems="center">
      <Link to="/">
        <img className={styles.logo} src={logo} alt="uppi.fi" />
        <h1>uppi.fi</h1>
      </Link>
      <Link to="/files" className={styles.smallLink}>
        Omat tiedostot
      </Link>
    </Row>
  );
}

export default HeaderLeftPart;
