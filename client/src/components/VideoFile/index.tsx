import { env } from "../../env";
import { FileT } from "../../views/List";

interface VideoFileProps {
  file: FileT;
}

function VideoFile({ file }: VideoFileProps) {
  return (
    <video width={720} controls>
      <source
        src={`${env.serverHost}/${file.filename}`}
        type={file.mime_type}
      />
    </video>
  );
}

export default VideoFile;
