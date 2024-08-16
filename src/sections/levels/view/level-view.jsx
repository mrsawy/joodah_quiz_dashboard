import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getLevelThunk } from '../../../store/level/levelSlice';

import LevelsGroup from '../LevelsGroup';

// ---------------------------------------------
export default function LevelView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Here You Can Customize Your Levels 👋
      </Typography>

      <LevelsGroup />
    </Container>
  );
}
