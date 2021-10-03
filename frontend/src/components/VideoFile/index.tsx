import { FileT } from '@shared/schema';
import { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilValue } from 'recoil';
import { autoPlayState } from '../../state/autoPlayState';
import { getFileUrl } from '../../utils/url';

interface VideoFileProps {
  file: FileT;
}

function VideoFile({ file }: VideoFileProps) {
  const autoPlay = useRecoilValue(autoPlayState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousFileId = useRef(file.id);

  useEffect(() => {
    if (previousFileId.current === file.id) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousFileId.current = file.id;
  }, [file.id]);

  const shouldPlay = useMemo(() => autoPlay.video, []);

  return (
    <ReactPlayer
      playing={shouldPlay}
      url={getFileUrl(file)}
      controls
      width="100%"
      height="75vh"
      style={{
        background: '#000',
      }}
    />
  );
}
export default VideoFile;
