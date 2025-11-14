import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const AddArticlePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: [],
    image: null,
    imagePreview: null,
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Technology',
    'Business',
    'Science',
    'Health',
    'Entertainment',
    'Sports',
    'Politics',
    'Environment',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToDelete)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, you would upload the image to a server here
    // and then save the article data to your database
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate back to home after successful submission
      navigate('/');
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component="a"
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, textTransform: 'none' }}
      >
        Back to Articles
      </Button>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Article
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                label="Article Title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="summary"
                name="summary"
                label="Short Summary"
                value={formData.summary}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="content"
                name="content"
                label="Article Content"
                value={formData.content}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={8}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Article Image
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mr: 2 }}
                  >
                    Upload Image
                  </Button>
                </label>
                {formData.image && (
                  <Typography variant="body2" color="text.secondary" component="span">
                    {formData.image.name}
                  </Typography>
                )}
              </Box>
              
              {formData.imagePreview && (
                <Box sx={{ mt: 2, mb: 3, maxWidth: '100%' }}>
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd();
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim()}
                >
                  Add
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ minWidth: 120 }}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddArticlePage;
