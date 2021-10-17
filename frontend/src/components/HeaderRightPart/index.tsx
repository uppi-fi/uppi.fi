import { isAudioFile, isVideoFile } from '@shared/mimetype';
import { useRecoilValue } from 'recoil';
import { currentFileState } from '../../state/currentFileState';
import AutoPlayButton from '../AutoPlayButton';
import styles from './HeaderRightPart.module.scss';

interface HeaderRightPartProps {
  pageLoads: number | undefined;
}

function HeaderRightPart({ pageLoads }: HeaderRightPartProps) {
  const currentFile = useRecoilValue(currentFileState);
  const shouldRenderAutoPlayBtn =
    currentFile && (isVideoFile(currentFile) || isAudioFile(currentFile));

  return (
    <div className={styles.root}>
      {pageLoads !== undefined && `Sivulatauksia: ${pageLoads}`}
      {shouldRenderAutoPlayBtn && (
        <AutoPlayButton type={isVideoFile(currentFile) ? 'video' : 'audio'} />
      )}
    </div>
  );
}

export default HeaderRightPart;
