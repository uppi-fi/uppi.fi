import { useRecoilValue } from "recoil";
import { appState } from "../../state/appState";
import { getServerUrl } from "../../utils/url";
import IconButton from "../IconButton";

function DownloadButton() {
  const { currentFile } = useRecoilValue(appState);

  if (!currentFile) return null;

  return (
    <a href={getServerUrl(`dl?fileId=${currentFile.id}`)} download>
      <IconButton tooltip="Lataa tiedosto" icon="fa-solid:download" />
    </a>
  );
}

export default DownloadButton;
