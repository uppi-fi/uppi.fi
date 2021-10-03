import { useRecoilState } from 'recoil';
import { autoPlayState } from '../../state/autoPlayState';
import IconButton from '../IconButton';

interface AutoPlayButtonProps {
  type: 'audio' | 'video';
}

function AutoPlayButton({ type }: AutoPlayButtonProps) {
  const [autoPlay, setAutoPlay] = useRecoilState(autoPlayState);
  const isAutoPlaying = autoPlay[type];

  return (
    <IconButton
      icon={isAutoPlaying ? 'fa-solid:play-circle' : 'fa-solid:pause-circle'}
      label="Automaattitoisto"
      tooltip={isAutoPlaying ? 'Päällä' : 'Pois päältä'}
      tooltipPlacement="left"
      onClick={() =>
        setAutoPlay({
          ...autoPlay,
          [type]: !isAutoPlaying,
        })
      }
    />
  );
}

export default AutoPlayButton;
