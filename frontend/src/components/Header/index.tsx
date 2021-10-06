import { useRecoilValue } from 'recoil';
import { Link } from 'wouter';
import { isAudioFile, isVideoFile } from '../../../../shared/mimetype';
import logo from '../../assets/images/logo.png';
import { currentFileState } from '../../state/currentFileState';
import { currentUserState } from '../../state/currentUserState';
import Row from '../atoms/Row';
import AutoPlayButton from '../AutoPlayButton';
import styles from './Header.module.scss';

interface HeaderProps {
  pageLoads: number | undefined;
}

function Header({ pageLoads }: HeaderProps) {
  const currentFile = useRecoilValue(currentFileState);
  const currentUser = useRecoilValue(currentUserState);
  const shouldRenderAutoPlayBtn =
    currentFile && (isVideoFile(currentFile) || isAudioFile(currentFile));

  return (
    <header className={styles.header}>
      <Row alignItems="center">
        <Link to="/">
          <img src={logo} alt="uppim.me" />
          <h1>uppim.me</h1>
        </Link>
        {currentUser && (
          <Link to="/files" className={styles.smallLink}>
            Tiedostot
          </Link>
        )}
      </Row>

      <div className={styles.right}>
        {pageLoads !== undefined && `Sivulatauksia: ${pageLoads}`}
        {shouldRenderAutoPlayBtn && (
          <AutoPlayButton type={isVideoFile(currentFile) ? 'video' : 'audio'} />
        )}
      </div>
    </header>
  );
}

export default Header;
