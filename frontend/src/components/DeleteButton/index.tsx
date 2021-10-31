import { showInfoMessage } from '@frontend/utils/snackBar';
import { ApiMessage, DeleteFileResponse } from '@shared/api';
import { useLocation } from 'wouter';
import deleteSound from '../../assets/sounds/delete.mp3';
import { useApiService } from '../../services/useApiService';
import IconButton from '../IconButton';

interface DeleteButtonProps {
  fileId: string;
}

function DeleteButton({ fileId }: DeleteButtonProps) {
  const { post: deleteFile } = useApiService<DeleteFileResponse>('delete-file');
  const [, setLocation] = useLocation();

  const goBackOrHome = () => {
    try {
      if (history.length) {
        history.back();
      } else {
        setLocation('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClick = async () => {
    try {
      const res = await deleteFile(
        {
          fileId,
        },
        {
          timeout: 1000,
        }
      );

      if (res.message !== ApiMessage.Ok) {
        return;
      }

      goBackOrHome();

      const audio = new Audio(deleteSound);
      audio.volume = 0.25;
      audio.play();

      showInfoMessage('Tiedosto poistettu', `"${res.filename}" poistettiin`);
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
