import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { $playlist, $playlistError, getPlaylistPageData, resetPlaylistPageData } from './effect';
import { useUnit } from 'effector-react';
import Error from '../Error';
import { Box, Typography } from '@mui/material';
import PageHeader from '../../components/pageHeader';

const PlaylistPage = () => {
  const { id } = useParams();

  const playlist = useUnit($playlist);
  const error = useUnit($playlistError);

  useEffect(() => {
    if (id) getPlaylistPageData(id);

    return resetPlaylistPageData;
  }, [id]);

  useEffect(() => {
    document.title = 'Spotify Clone';
  }, []);

  if (error) return <Error />;

  return (
    <>
      {playlist?.meta && <PageHeader {...playlist.meta} />}
      <Box position="relative" zIndex={1}>
        <Typography>tracks and stuff</Typography>
      </Box>
    </>
  );
};

export default PlaylistPage;
