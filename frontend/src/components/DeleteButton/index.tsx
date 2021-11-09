import { deleteFile } from '@frontend/api';
import { useToast } from '@frontend/services/useToast';
import { fileListState } from '@frontend/state/fileList/fileListState';
import { ApiMessage } from '@shared/api';
import { useSetRecoilState } from 'recoil';
import { useLocation } from 'wouter';
import deleteSound from '../../assets/sounds/delete.mp3';
import IconButton from '../IconButton';

interface DeleteButtonProps {
  fileId: string;
}

function DeleteButton({ fileId }: DeleteButtonProps) {
  const setFiles = useSetRecoilState(fileListState);
  const [, setLocation] = useLocation();
  const toast = useToast();

  const onClick = async () => {
    try {
      const res = await deleteFile({
        fileId,
      });

      if (res.message !== ApiMessage.Ok) {
        toast.error('Tiedoston poistaminen epäonnistui', 'Joku meni mönkään');
        return;
      }

      const audio = new Audio(deleteSound);
      audio.volume = 0.25;
      audio.play();

      setFiles((oldFiles) =>
        (oldFiles || []).filter((oldFile) => oldFile.id !== res.id)
      );
      setLocation('/files');
      toast.info('Tiedosto poistettu', `"${res.filename}" poistettiin`);
    } catch (err) {
      console.error(err);
      alert('Poistaminen ei onnistunut');
    }
  };

  return (
    <IconButton
      tooltip="Poista tiedosto"
      icon="fa-solid:trash-alt"
      onClick={onClick}
    />
  );
}

export default DeleteButton;
