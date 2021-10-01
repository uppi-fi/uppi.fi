import IconButton from "../IconButton";

interface DownloadButtonProps {
  url: string;
}

function DownloadButton({ url: downloadUrl }: DownloadButtonProps) {
  return (
    <a href={downloadUrl} download>
      <IconButton tooltip="Lataa tiedosto" icon="fa-solid:download" />
    </a>
  );
}

export default DownloadButton;
