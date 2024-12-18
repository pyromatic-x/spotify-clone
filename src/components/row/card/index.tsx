import { Box, Typography } from '@mui/material';
import { StyledCard } from './styled';
import PlayButton from '../../buttons/PlayButton';
import { PlayButtonWrapper } from '../../buttons/styled';
import { capitalizeFirstLetter } from '../../../utils/strings';
import { TItemCommonFields } from '../types';
import { useUnit } from 'effector-react';
import { $queue } from '../../audiobar/effect';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { $mainContainer } from '../../main/effect';
import { useNavigate } from 'react-router-dom';

const RowCard = ({ cover, _id, _collection, name, description, author }: TItemCommonFields) => {
  const queue = useUnit($queue);
  const { width } = useUnit($mainContainer);
  const { playing } = useGlobalAudioPlayer();

  const navigate = useNavigate();

  return (
    <StyledCard
      showPlayButton={queue?.target === _id && playing}
      onClick={() => navigate(`/${_collection}/${_id}`)}
    >
      <Box position="relative" sx={{ aspectRatio: 1, width: '100%' }}>
        <Box
          component="img"
          src={cover + '?w=384&h=384'}
          sx={{ borderRadius: _collection === 'artist' ? '50%' : '6px' }}
        />
        <PlayButtonWrapper className="playbutton-container">
          <PlayButton
            source={{ _id, type: _collection }}
            size={width < 900 ? 36 : 48}
            title={name + ' by ' + author?.name}
          />
        </PlayButtonWrapper>
      </Box>
      <Typography fontSize="0.95rem" truncate={2} mt={0.5}>
        {name}
      </Typography>
      <Typography fontSize="0.85rem" color="secondary" truncate={2} mt={0.5}>
        {description || author?.name || capitalizeFirstLetter(_collection)}
      </Typography>
    </StyledCard>
  );
};

export default RowCard;
