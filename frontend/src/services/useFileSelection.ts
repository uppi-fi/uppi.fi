import { FileT, FileTId } from '@shared/schema';
import { useSet } from 'react-use';
import { useLocation } from 'wouter';

export function useFileSelection() {
  const [
    ,
    {
      has: hasSelectedFileId,
      toggle: toggleSelectedFileId,
      reset: clearSelectedFileIds,
    },
  ] = useSet(new Set<FileTId>([]));
  const [, setLocation] = useLocation();

  const onClickFile = (event: React.MouseEvent, file: FileT) => {
    if (event.ctrlKey) {
      toggleSelectedFileId(file.id);
    } else {
      setLocation('/files/' + file.id);
    }
  };

  const onClickAway = (event: React.MouseEvent) => {
    if (!event.ctrlKey) {
      clearSelectedFileIds();
    }
  };

  const onDoubleClickFile = (file: FileT) => {
    setLocation('/files/' + file.id);
  };

  return {
    onClickFile,
    onClickAway,
    onDoubleClickFile,
    hasSelectedFileId,
    toggleSelectedFileId,
    clearSelectedFileIds,
  };
}
