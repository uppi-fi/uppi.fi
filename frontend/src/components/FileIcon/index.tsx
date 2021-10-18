import { getFileUrl, getVideoPreviewUrl } from '@frontend/utils/url';
import { Icon } from '@iconify/react';
import {
  isAudioFile,
  isImageFile,
  isTextFile,
  isVideoFile,
} from '@shared/mimetype';
import { FileT } from '@shared/schema';
import ImageWithFallback from '../ImageWithFallback';

interface FileIconProps {
  file: FileT;
}

/**
 * Renders icon for file. Can be image/video thumbnail.
 */
function FileIcon({ file }: FileIconProps) {
  const fileUrl = getFileUrl(file);

  if (isImageFile(file)) {
    return (
      <ImageWithFallback
        fallback={() => <Icon icon="ant-design:file-image-twotone" />}
        src={fileUrl}
        alt={file.filename}
        draggable="false"
      />
    );
  }

  if (isVideoFile(file)) {
    return (
      <ImageWithFallback
        fallback={() => <Icon icon="ant-design:play-circle-twotone" />}
        src={getVideoPreviewUrl(file)}
        alt={file.filename}
        draggable="false"
      />
    );
  }

  if (isAudioFile(file)) {
    return <Icon icon="ant-design:sound-twotone" />;
  }

  if (isTextFile(file)) {
    return <Icon icon="ant-design:file-text-twotone" />;
  }

  return <Icon icon="ant-design:file-twotone" />;
}

export default FileIcon;
