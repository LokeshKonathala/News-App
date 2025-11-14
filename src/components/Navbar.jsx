import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NewspaperIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NEWS APP
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ color: 'white' }}
          >
            Home
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
