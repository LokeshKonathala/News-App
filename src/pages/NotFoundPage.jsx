import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
      <Typography variant="h2" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
