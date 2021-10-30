import { currentUserState } from '@frontend/state/currentUserState';
import { isAudioFile, isVideoFile } from '@shared/mimetype';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentFileState } from '../../state/currentFileState';
import AutoPlayButton from '../AutoPlayButton';
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
      {currentUser && (
        <>
          Käyttäjä: {currentUser.username}
          <button onClick={() => setCurrentUser(null)}>Kirjaudu ulos</button>
        </>
      )}
      {pageLoads !== undefined && `Sivulatauksia: ${pageLoads}`}
      {shouldRenderAutoPlayBtn && (
        <AutoPlayButton type={isVideoFile(currentFile) ? 'video' : 'audio'} />
      )}
    </div>
  );
}

export default HeaderRightPart;
