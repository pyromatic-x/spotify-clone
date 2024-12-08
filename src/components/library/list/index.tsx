import { useUnit } from 'effector-react';
import { StyledLibraryList } from './styled';
import { $filter, $libraryItems, $UI, getLibraryItemsFx } from '../effect';
import LibrarySkeleton from './Skeleton';
import LibrarySearchNothingFound from './NothingFound';
import LibraryItem from './item';

const LibraryList = () => {
  const items = useUnit($libraryItems);
  const { search } = useUnit($filter);
  const { width } = useUnit($UI);
  const { view } = useUnit($filter);
  const isLoading = useUnit(getLibraryItemsFx.pending);

  return (
    <StyledLibraryList gridSize={view.type === 'Grid' ? view.gridSize : undefined} width={width.name}>
      {isLoading ? (
        <LibrarySkeleton size={20} />
      ) : !!search && !items?.length ? (
        <LibrarySearchNothingFound />
      ) : (
        items?.map((item) => <LibraryItem {...item} key={item._id} />)
      )}
    </StyledLibraryList>
  );
};

export default LibraryList;
