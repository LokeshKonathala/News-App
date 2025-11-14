import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import { format } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const ArticleCard = ({ article }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '450px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        margin: 0,
        flex: '1 0 auto'
      }}
    >
      <Box sx={{ 
        width: '100%',
        height: '200px',
        minHeight: '200px',
        overflow: 'hidden',
        flexShrink: 0,
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <Box
          component="img"
          src={article.image}
          alt={article.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x225?text=${encodeURIComponent(article.title)}`;
          }}
        />
      </Box>
      <CardContent sx={{ 
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        '&:last-child': {
          pb: 2
        },
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          flex: '1 1 auto',
          overflow: 'hidden'
        }}>
          <Chip
            label={article.category}
            color="primary"
            size="small"
            sx={{ 
              mb: 1,
              alignSelf: 'flex-start'
            }}
          />
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
              minHeight: '3em',
              lineHeight: '1.5em',
              fontWeight: 600
            }}
          >
            {article.title}
          </Typography>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 2
              }}
            >
              {article.summary}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 'auto', pt: 1 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <PersonIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
            <Typography variant="caption" color="text.secondary">
              {article.author}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
            <Typography variant="caption" color="text.secondary">
              {format(new Date(article.publishedDate), 'MMM d, yyyy')} • {article.readTime}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <Button
          component={Link}
          to={`/article/${article.slug}`}
          size="small"
          color="primary"
          sx={{ ml: 'auto' }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
