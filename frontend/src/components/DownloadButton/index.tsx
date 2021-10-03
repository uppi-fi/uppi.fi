import { getServerUrl } from '../../utils/url';
import IconButton from '../IconButton';

interface DownloadButtonProps {
  fileId: string;
}

function DownloadButton({ fileId }: DownloadButtonProps) {
  return (
    <a href={getServerUrl(`dl?fileId=${fileId}`)} download>
      <IconButton tooltip="Lataa tiedosto" icon="fa-solid:download" />
    </a>
  );
}

export default DownloadButton;
