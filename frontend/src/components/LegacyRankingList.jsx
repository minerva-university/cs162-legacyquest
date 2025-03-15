import { Stack, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedLegacy from './ListedLegacy';

export default function LegacyRankingList({highlightedLegacy}) {
  const theme = useTheme();
  const legacyRanking = [
    {name: 'Octagon', points: 999},
    {name: 'Tower', points: 888},
    {name: 'Bridge', points: 777},
    {name: 'Hunter', points: 666},
    {name: 'Chronicle', points: 555},
    {name: 'Pyramid', points: 444},
    {name: 'Vista', points: 333},
    {name: 'Cable', points: 222},
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