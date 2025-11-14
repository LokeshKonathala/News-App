import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Box, Typography } from '@mui/material';
import ArticleCard from '../components/ArticleCard';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/data/articles.json');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || article.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(articles.map(article => article.category))];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography>Loading articles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" my={4}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: 'calc(100vh - 64px - 32px)' }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Latest News
        </Typography>
        <Box display="flex" gap={2} mb={4} flexWrap="wrap">
          <TextField
            label="Search articles..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: 300 }}
          />
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            size="small"
            SelectProps={{ native: true }}
            sx={{ minWidth: 200 }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>
        {filteredArticles.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '50vh',
            textAlign: 'center',
            p: 3
          }}>
            <Typography variant="h6">
              No articles found. Try adjusting your search.
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: '24px',
            width: '100%'
          }}>
            {filteredArticles.map((article) => (
              <Box key={article.id} sx={{ display: 'flex' }}>
                <ArticleCard article={article} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
