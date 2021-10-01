import { useLocalStorage } from "react-use";
import { useRecoilValue } from "recoil";
import { Link } from "wouter";
import logo from "../../assets/logo.png";
import { appState } from "../../state/appState";
import { isVideoFile } from "../../utils/mimetype";
import AutoPlayButton from "../AutoPlayButton";
import styles from "./Header.module.scss";

function Header() {
  const { currentFile } = useRecoilValue(appState);
  const [autoPlay, setAutoPlay] = useLocalStorage("autoPlay", false);
  const shouldRenderRightSide = currentFile && isVideoFile(currentFile);

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="uppim.me" />
        <h1>uppim.me</h1>
      </Link>

      {shouldRenderRightSide && (
        <div className={styles.right}>
          <AutoPlayButton />
        </div>
      )}
    </header>
  );
}

export default Header;
