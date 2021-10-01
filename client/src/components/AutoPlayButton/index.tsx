import { useLocalStorage } from "react-use";
import IconButton from "../IconButton";

function AutoPlayButton() {
  const [autoPlay, setAutoPlay] = useLocalStorage("autoPlay", false);

  return (
    <IconButton
      icon={autoPlay ? "fa-solid:play-circle" : "fa-solid:pause-circle"}
      label="Auto-play"
      tooltip={autoPlay ? "Päällä" : "Pois päältä"}
      tooltipPlacement="left"
      onClick={() => setAutoPlay(!autoPlay)}
    />
  );
}

export default AutoPlayButton;
