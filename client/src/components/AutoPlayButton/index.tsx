import { useRecoilState } from "recoil";
import { autoPlayState } from "../../state/autoPlayState";
import IconButton from "../IconButton";

function AutoPlayButton() {
  const [autoPlay, setAutoPlay] = useRecoilState(autoPlayState);

  return (
    <IconButton
      icon={autoPlay ? "fa-solid:play-circle" : "fa-solid:pause-circle"}
      label="Automaattitoisto"
      tooltip={autoPlay ? "Päällä" : "Pois päältä"}
      tooltipPlacement="left"
      onClick={() => setAutoPlay(!autoPlay)}
    />
  );
}

export default AutoPlayButton;
