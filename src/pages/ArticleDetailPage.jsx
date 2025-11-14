import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Divider, Chip, Avatar } from '@mui/material';
import { format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/data/articles.json');
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        const foundArticle = data.articles.find(a => a.slug === slug);
        
        if (!foundArticle) {
          throw new Error('Article not found');
        }
        
        setArticle(foundArticle);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography>Loading article...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography color="error" variant="h6" gutterBottom>
          Error: {error}
        </Typography>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!article) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Articles
      </Button>

      <article>
        <Chip
          label={article.category}
          color="primary"
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {article.title}
        </Typography>
        
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, mr: 1.5 }}>
            {article.author.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" component="div">
              {article.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {format(new Date(article.publishedDate), 'MMMM d, yyyy')} • {article.readTime}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <img
            src={
              article.image && article.image.startsWith('http')
                ? article.image
                : `https://source.unsplash.com/random/1200x800/?${article.category},${article.id}`
            }
            alt={article.title}
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => {
              e.target.src = `https://source.unsplash.com/random/1200x800/?${article.category},${article.id}`;
            }}
          />
        </Box>

        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
            mb: 3,
          }}
        >
          {article.content}
        </Typography>

        {article.tags && article.tags.length > 0 && (
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              TAGS:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {article.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </article>
    </Container>
  );
};

export default ArticleDetailPage;
