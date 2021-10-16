import IconButton from '../IconButton';

function DownloadButton({ url }: { url: string }) {
  return (
    <a href={url} download>
      <IconButton tooltip="Lataa tiedosto" icon="fa-solid:download" />
    </a>
  );
}

export default DownloadButton;
