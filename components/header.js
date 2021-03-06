import { AppBar, Typography, Container } from '@material-ui/core';

export default function Header() {
  return (
    <header>
      <AppBar>
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1">
            NBA Props
          </Typography>
        </Container>
      </AppBar>
    </header>
  );
}
