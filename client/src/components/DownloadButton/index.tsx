import { useRecoilValue } from "recoil";
import { currentFileState } from "../../state/currentFileState";
import { getServerUrl } from "../../utils/url";
import IconButton from "../IconButton";

function DownloadButton() {
  const currentFile = useRecoilValue(currentFileState);

  if (!currentFile) return null;

  return (
    <a href={getServerUrl(`dl?fileId=${currentFile.id}`)} download>
      <IconButton tooltip="Lataa tiedosto" icon="fa-solid:download" />
    </a>
  );
}

export default DownloadButton;
