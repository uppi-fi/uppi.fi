import { useLocation } from "wouter";
import deleteSound from "../../assets/sounds/delete.mp3";
import { useApiService } from "../../services/useApiService";
import IconButton from "../IconButton";

interface DeleteButtonProps {
  fileId: string;
}

function DeleteButton({ fileId }: DeleteButtonProps) {
  const [, setLocation] = useLocation();
  const { post: deleteFile } = useApiService("delete-file");

  const onClick = async () => {
    deleteFile(
      {
        fileId,
      },
      {
        timeout: 1000,
      },
    )
      .then(() => {
        setLocation("/");
        new Audio(deleteSound).play();
      })
      .catch(() => {
        alert("Poistaminen epäonnistui");
      });
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
