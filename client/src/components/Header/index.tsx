import { useRecoilValue } from "recoil";
import { Link } from "wouter";
import logo from "../../assets/images/logo.png";
import { currentFileState } from "../../state/currentFileState";
import { currentUserState } from "../../state/currentUserState";
import { isAudioFile, isVideoFile } from "../../utils/mimetype";
import AutoPlayButton from "../AutoPlayButton";
import styles from "./Header.module.scss";

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
      <div className={styles.row}>
        <Link to="/">
          <img src={logo} alt="uppim.me" />
          <h1>uppim.me</h1>
        </Link>
        {currentUser && (
          <Link to="/files" className={styles.smallLink}>
            Tiedostot
          </Link>
        )}
      </div>

      <div className={styles.right}>
        {pageLoads !== undefined && `Sivulatauksia: ${pageLoads}`}
        {shouldRenderAutoPlayBtn && (
          <AutoPlayButton type={isVideoFile(currentFile) ? "video" : "audio"} />
        )}
      </div>
    </header>
  );
}

export default Header;
