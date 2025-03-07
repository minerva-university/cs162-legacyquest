import { Stack, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedLegacy from './ListedLegacy';

export default function LegacyRankingList({highlightedLegacy}) {
  const theme = useTheme();
  const legacyRanking = [
    {name: 'AAA', points: 999},
    {name: 'BBB', points: 888},
    {name: 'CCC', points: 777},
    {name: 'DDD', points: 666},
    {name: 'EEE', points: 555},
    {name: 'FFF', points: 444},
    {name: 'GGG', points: 333},
    {name: 'HHH', points: 222},
  ];

  return (
      <Stack sx={{width: 0.8, minWidth: '300px', borderRadius: 2, px: 4, py: 2, boxShadow: `0 0 6px ${theme.palette.shadowGreen}`}}>
        <List>
          <Typography variant='h6' sx={{px: 3, py: 1, fontWeight: 800, mb: 2}}>Legacy Ranking</Typography>
          {legacyRanking.map((legacy, index) => (
            <ListedLegacy
            key={index}
            legacyRanking={index+1}
            legacyName={legacy.name}
            legacyScore={legacy.points}
            isHighlighted={highlightedLegacy === legacy.name} />
            ))}
        </List>
      </Stack>
  );
}