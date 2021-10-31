import { currentUserState } from '@frontend/state/currentUserState';
import { isAudioFile, isVideoFile } from '@shared/mimetype';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentFileState } from '../../state/currentFileState';
import AutoPlayButton from '../AutoPlayButton';
import Button from '../Button';
import styles from './HeaderRightPart.module.scss';

interface HeaderRightPartProps {
  pageLoads: number | undefined;
}

function HeaderRightPart({ pageLoads }: HeaderRightPartProps) {
  const currentFile = useRecoilValue(currentFileState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const shouldRenderAutoPlayBtn =
    currentFile && (isVideoFile(currentFile) || isAudioFile(currentFile));

  return (
    <div className={styles.root}>
      {pageLoads !== undefined && `Sivulatauksia: ${pageLoads}`}
      {shouldRenderAutoPlayBtn && (
        <AutoPlayButton type={isVideoFile(currentFile) ? 'video' : 'audio'} />
      )}
      {currentUser && (
        <>
          <Button kind="secondary" onClick={() => setCurrentUser(null)}>
            Kirjaudu ulos
          </Button>
        </>
      )}
    </div>
  );
}

export default HeaderRightPart;
