import { Grid, Typography } from '@mui/material';
import { LibraryItemDto } from '../../../../../api/dto/library';
import { useUnit } from 'effector-react';
import { $filter, $UI } from '../../../effect';
import { PinIcon, StyledLibraryItem } from '../styled';
import DateColumn from '../DateColumn';
import { LibraryCategories } from '../../../types';
import { capitalizeFirstLetter } from '../../../../../utils/strings';

const Description = ({
  category,
  author,
  collection,
}: {
  category: LibraryCategories | null;
  author: string;
  collection: LibraryItemDto['_collection'];
}) => {
  let text = '';

  if (!category) text = '🞄 ' + capitalizeFirstLetter(collection);
  if (category === LibraryCategories['Albums']) text = '🞄 ' + author;

  return <Typography color="secondary">{text}</Typography>;
};

const LibraryItemCompact = (item: LibraryItemDto) => {
  const { width } = useUnit($UI);
  const { category } = useUnit($filter);
  const { pin, name, _collection, author } = item;

  return (
    <StyledLibraryItem gridTemplateColumns={width.name !== 'default' ? '60% 1fr 1fr' : '1fr'}>
      <Grid container alignItems="center">
        {pin && (
          <>
            <PinIcon />
            &nbsp;
          </>
        )}
        <Typography color={pin ? 'primary' : 'white'}>{name}&nbsp;</Typography>
        <Description category={category} collection={_collection} author={author!} />
      </Grid>
      {width.name === 'max' && (
        <>
          <DateColumn date={item.addedAt} />
          <DateColumn date={item.lastPlayedAt} justifyContent="end" />
        </>
      )}
    </StyledLibraryItem>
  );
};

export default LibraryItemCompact;
