import { Grid, Link, Typography } from '@mui/material';
import { MetaBackground, Meta, MetaAuthorAvatar, MetaContent, MetaCover, MetaName } from './styled';
import { useUnit } from 'effector-react';
import { SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getAccentFromImage } from '../../../utils/color';
import { $mainContainer, changeMainAccent } from '../../main/effect';
import { PlaylistPageDto } from '../../../api/dto/playlist';
import { AlbumPageDto } from '../../../api/dto/album';
import { UserPageDto } from '../../../api/dto/user';
import { UnitPageProps } from './types';
import { Link as RouterLink } from 'react-router-dom';
import { darkenAccent } from './utils';
import { secondsToTime } from '../../../utils/time';

const UnitMetaBase = ({ type, meta }: UnitPageProps) => {
  const coverRef = useRef(null);

  const [nameFontSize, setNameFontSize] = useState(96);

  const { width, accent } = useUnit($mainContainer);

  const nameLength = meta?.name?.length || meta?.username?.length || 16;
  const isContainerNarrow = width < 600;

  useLayoutEffect(() => {
    let size = 92;

    if (width <= 600) size = 36;
    else if (width <= 700) size = 42;
    else if (width <= 900) size = 52;
    else if (width <= 1300) size = 62;
    else if (width <= 1500) size = 78;

    if (nameLength > 24) size -= nameLength / 2.5;

    if (nameFontSize !== size) setNameFontSize(size);
  }, [width]);

  useEffect(() => {
    if (meta.accent) changeMainAccent(darkenAccent(meta.accent));
  }, [meta.accent]);

  const onCoverLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (accent) return;
    const color = getAccentFromImage(event.currentTarget);
    if (color && !accent) changeMainAccent(darkenAccent(color));
  };

  return (
    <>
      <MetaBackground accent={accent} height={isContainerNarrow ? '190px' : '340px'} />
      <Meta pb={isContainerNarrow ? '30px' : '40px'} pt={isContainerNarrow ? '30px' : '80px'}>
        <MetaCover
          ref={coverRef}
          src={meta?.cover || meta?.avatar + '?w=460&h=460'}
          size={isContainerNarrow ? '130px' : '230px'}
          onLoadCapture={onCoverLoad}
        />
        {type === 'playlist' && (
          <PlaylistContent {...(meta as PlaylistPageDto['meta'])} nameFontSize={nameFontSize} />
        )}
        {type === 'album' && <AlbumContent {...(meta as AlbumPageDto['meta'])} nameFontSize={nameFontSize} />}
        {type === 'user' && <UserContent {...(meta as UserPageDto['meta'])} nameFontSize={nameFontSize} />}
      </Meta>
    </>
  );
};

const PlaylistContent = ({
  name,
  author,
  tracksCount,
  nameFontSize,
  description,
  type,
  duration,
}: { nameFontSize: number } & PlaylistPageDto['meta']) => {
  return (
    <MetaContent>
      <Typography fontSize="0.85rem">Playlist</Typography>
      <MetaName truncate={3} maxWidth="100%" fontSize={nameFontSize + 'px'}>
        {name}
      </MetaName>

      {description && (
        <Typography color="secondary.dark" fontSize="0.8rem" fontWeight="bold" mb={0.5}>
          {description}
        </Typography>
      )}

      <Grid container alignItems="center">
        <MetaAuthorAvatar src={author.avatar + '?w=48&h=48'} />
        <Link component={RouterLink} to={`/artist/${author._id}`} fontSize="0.85rem">
          {author?.name}
        </Link>
        <Typography color="secondary.dark" fontSize="0.85rem">
          &nbsp;{`🞄 ${tracksCount} songs`}
        </Typography>
        {(type === 'public' || type === 'private') && (
          <Typography color="secondary.dark" fontSize="0.85rem">
            , {secondsToTime(duration)}
          </Typography>
        )}
      </Grid>
    </MetaContent>
  );
};
const AlbumContent = ({
  name,
  author,
  tracksCount,
  nameFontSize,
  releasedAt,
  duration,
}: { nameFontSize: number } & AlbumPageDto['meta']) => {
  return (
    <MetaContent>
      <Typography fontSize="0.85rem">Album</Typography>

      <MetaName truncate={3} maxWidth="100%" fontSize={nameFontSize + 'px'}>
        {name}
      </MetaName>
      <Grid container alignItems="center">
        <MetaAuthorAvatar src={author.avatar + '?w=48&h=48'} />
        <Link component={RouterLink} to={`/artist/${author._id}`} fontSize="0.85rem">
          {author?.name}
        </Link>
        <Typography color="secondary.dark" fontSize="0.85rem">
          &nbsp;{`🞄 ${new Date(releasedAt).getFullYear()} 🞄 ${tracksCount} songs`}
        </Typography>
        <Typography color="secondary.dark" fontSize="0.85rem">
          , {secondsToTime(duration)}
        </Typography>
      </Grid>
    </MetaContent>
  );
};

const UserContent = ({ username, nameFontSize }: { nameFontSize: number } & UserPageDto['meta']) => {
  return (
    <MetaContent>
      <Typography fontSize="0.85rem">Profile</Typography>
      <MetaName truncate={3} maxWidth="100%" fontSize={nameFontSize + 'px'}>
        {username}
      </MetaName>
      <Grid container alignItems="center">
        {/* <HeaderAuthorAvatar src={avatar + '?w=48&h=48'} />
        <Link fontSize="0.85rem">{author?.name}</Link>
        <Typography color="secondary" fontSize="0.85rem">
          &nbsp;{`🞄 ${new Date(createdAt).getFullYear()} songs 🞄 ${tracksCount} songs`}
        </Typography> */}
      </Grid>
    </MetaContent>
  );
};

export default UnitMetaBase;
