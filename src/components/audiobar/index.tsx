import { Container } from './styled';
import Meta from './meta';
import Additional from './additional';
import Player from './player';
import { setQueue } from './effect';
import { MOCK_QUEUE } from './mock';

const AudioBar = () => {
  setQueue(MOCK_QUEUE);

  return (
    <Container>
      <Meta />
      <Player />
      <Additional />
    </Container>
  );
};

export default AudioBar;
