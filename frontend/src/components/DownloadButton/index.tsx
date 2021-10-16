import { FileT } from '@shared/schema';
import { getFileDownloadUrl } from '../../utils/url';
import IconButton from '../IconButton';

function DownloadButton({ file }: { file: FileT }) {
  return (
    <a href={getFileDownloadUrl(file)} download>
      <IconButton tooltip="Lataa tiedosto" icon="fa-solid:download" />
    </a>
  );
}

export default DownloadButton;
