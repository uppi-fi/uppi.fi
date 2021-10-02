import { useRecoilValue } from "recoil";
import { Link } from "wouter";
import logo from "../../assets/logo.png";
import { currentFileState } from "../../state/currentFileState";
import { isVideoFile } from "../../utils/mimetype";
import AutoPlayButton from "../AutoPlayButton";
import styles from "./Header.module.scss";

function Header() {
  const currentFile = useRecoilValue(currentFileState);
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
