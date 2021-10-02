import axios from "axios";
import { useLocation } from "wouter";
import deleteSound from "../../assets/sounds/delete.mp3";
import { getServerUrl } from "../../utils/url";
import IconButton from "../IconButton";

interface DeleteButtonProps {
  fileId: string;
}

function DeleteButton({ fileId }: DeleteButtonProps) {
  const [, setLocation] = useLocation();
  const onClick = async () => {
    await axios.post(getServerUrl(`delete-file?fileId=${fileId}`));
    setLocation("/");
    new Audio(deleteSound).play();
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
