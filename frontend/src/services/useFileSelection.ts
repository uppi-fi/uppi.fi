import { FileT, FileTId } from '@shared/schema';
import { useSet } from 'react-use';
import { useLocation } from 'wouter';

export function useFileSelection() {
  const [
    ,
    {
      has: hasSelectedFileId,
      add: toggleSelectedFileId,
      reset: clearSelectedFileIds,
    },
  ] = useSet(new Set<FileTId>([]));
  const [, setLocation] = useLocation();

  const onClickFile = (file: FileT) => {
    toggleSelectedFileId(file.id);
  };

  const onClickAway = (event: MouseEvent) => {
    if (!event.ctrlKey) {
      console.log('onClickAway');
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
