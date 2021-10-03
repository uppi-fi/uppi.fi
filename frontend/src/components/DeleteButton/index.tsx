import { useLocation } from 'wouter';
import deleteSound from '../../assets/sounds/delete.mp3';
import { useApiService } from '../../services/useApiService';
import IconButton from '../IconButton';

interface DeleteButtonProps {
  fileId: string;
}

function DeleteButton({ fileId }: DeleteButtonProps) {
  const { post: deleteFile } = useApiService('delete-file');
  const [, setLocation] = useLocation();

  const goBackOrHomeAndPlayAudio = () => {
    try {
      if (history.length) {
        history.back();
      } else {
        setLocation('/');
      }

      const audio = new Audio(deleteSound);
      audio.volume = 0.25;
      audio.play();
    } catch (err) {
      console.error(err);
    }
  };

  const onClick = async () => {
    try {
      await deleteFile(
        {
          fileId,
        },
        {
          timeout: 1000,
        }
      );
      goBackOrHomeAndPlayAudio();
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
