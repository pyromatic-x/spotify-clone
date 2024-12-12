import { useUnit } from 'effector-react';
import { PlayDtoPayload } from '../../api/dto/play';
import { StyledPlayButton, StyledSimplePlayButton } from './styled';
import { PlayArrow as PlayIcon, Pause as PauseIcon } from '@mui/icons-material/';
import { $queue, changeQueue, changeTrack } from '../audiobar/effect';
import { memo } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { Tooltip } from '@mui/material';

type TProps = {
  title: string;
  source: {
    index?: number;
  } & PlayDtoPayload;

  size?: number;
  simple?: boolean;
};

const PlayButton = ({ size, source, title, simple }: TProps) => {
  const queue = useUnit($queue);
  const { playing, togglePlayPause } = useGlobalAudioPlayer();

  const { _id, type, index } = source;

  const isPlaying = queue?.target === _id && playing && (!!index ? queue.current === index : true);

  const handleOnClick = () => {
    if (queue?.target === _id) {
      if (index === queue?.current) {
        togglePlayPause();
      } else if (!!index) {
        changeTrack(index);
      }
    } else changeQueue({ _id, type, index });
  };

  return simple ? (
    <Tooltip title={`Play ${title}`}>
      <StyledSimplePlayButton
        className={`simple-playbutton simple-playbutton_${_id}`}
        onClick={handleOnClick}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </StyledSimplePlayButton>
    </Tooltip>
  ) : (
    <Tooltip title={`Play ${title}`}>
      <StyledPlayButton className={`playbutton playbutton_${_id}`} size={size} onClick={handleOnClick}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </StyledPlayButton>
    </Tooltip>
  );
};

export default memo(PlayButton);
