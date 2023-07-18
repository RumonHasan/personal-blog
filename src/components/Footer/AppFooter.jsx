import { Container, Grid } from '@mui/material';
const AppFooter = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          Footer
        </Grid>
        <Grid item xs={12} md={6}>
          Footer
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppFooter;
