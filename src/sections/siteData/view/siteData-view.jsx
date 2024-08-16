import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SiteDataPage from './../SiteDataPage';

// ----------------------------------------------------------------------
export default function BlogView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Control Site Data From Here 👋
      </Typography>
      <SiteDataPage />
    </Container>
  );
}
