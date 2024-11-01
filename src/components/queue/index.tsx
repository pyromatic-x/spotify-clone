import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { Content, StyledButton, Tabs } from './styled';
import QueueList from './QueueList';
import RecentlyPlayedList from './RecentlyPlayedList';
import { useUnit } from 'effector-react';
import { $recentlyPlayed } from '../audiobar/effect';

type ITabs = 'QUEUE' | 'RECENTLY_PLAYED';

const Queue = () => {
  const recentlyPlayed = useUnit($recentlyPlayed);

  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<ITabs>('QUEUE');
  const [addShadow, setAddShadow] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setAddShadow(event.currentTarget.scrollTop > 1);
  };

  const handleTabChange = (tab: ITabs) => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setActiveTab(tab);
  };

  return (
    <Box position="relative">
      <Tabs addShadow={addShadow}>
        <StyledButton active={activeTab === 'QUEUE'} onClick={() => handleTabChange('QUEUE')}>
          Queue
        </StyledButton>
        <StyledButton
          disabled={!recentlyPlayed.length}
          active={activeTab === 'RECENTLY_PLAYED'}
          onClick={() => handleTabChange('RECENTLY_PLAYED')}
        >
          Recently played
        </StyledButton>
      </Tabs>
      <Content onScroll={handleScroll} ref={contentRef}>
        {activeTab === 'QUEUE' && <QueueList />}
        {activeTab === 'RECENTLY_PLAYED' && <RecentlyPlayedList />}
      </Content>
    </Box>
  );
};

export default Queue;
