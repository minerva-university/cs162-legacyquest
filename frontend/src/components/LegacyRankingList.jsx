import { List, Paper, Typography } from '@mui/material';
import LegacyListDisplay from './LegacyListDisplay';

export default function LegacyRankingList() {
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
      <Paper sx={{width: 1, borderRadius: 2}}>
        <List>
          <Typography variant='h6' sx={{px: 3, py: 1, fontWeight: 800}}>Legacy Ranking</Typography>
          {legacyRanking.map((legacy, index) => (
            <LegacyListDisplay key={index} legacyRanking={index+1} legacyName={legacy.name} legacyScore={legacy.points} />
            ))}
        </List>
      </Paper>
  );
}