import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import GalleryContainer from './../GalleryContainer';

// ----------------------------------------------------------------------
export default function BlogView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Upload Site Images Here 👋
      </Typography>
      <GalleryContainer />
    </Container>
  );
}
