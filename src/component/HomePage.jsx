import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from '@mui/material';

const API_KEY = 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7'; 
const SECTION_LIST_URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`;
const ARTICLES_URL = `https://api.nytimes.com/svc/news/v3/content/all`;

const HomePage = () => {
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [section, setSection] = useState('all');
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(SECTION_LIST_URL);
        setSections(response.data.results);
      } catch (err) {
        setError('Failed to load sections.');
      }
    };
    fetchSections();
  }, []);

  
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(''); // Clear previous errors
      try {
        const response = await axios.get(`${ARTICLES_URL}/${section}.json`, {
          params: { 'api-key': API_KEY, page: page },
        });
        setArticles(response.data.results);
      } catch (err) {
        setError(`An error occurred: ${err.response ? err.response.data.message : err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [section, page]);

  const handleSectionChange = (newSection) => {
    setSection(newSection);
    setPage(1); 
  };
  const addToReadLater = (article) => {
    const savedArticles = JSON.parse(localStorage.getItem('readLater')) || [];
    if (!savedArticles.some(saved => saved.url === article.url)) {
      savedArticles.push(article);
      localStorage.setItem('readLater', JSON.stringify(savedArticles));
    }
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: '30px' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>Sections</Typography>
          <List>
            {sections.map((sec) => (
              <ListItem button key={sec.section} selected={sec.section === section} onClick={() => handleSectionChange(sec.section)}>
                <ListItemText primary={sec.display_name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>{section.charAt(0).toUpperCase() + section.slice(1)} News</Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Grid container spacing={3}>
              {articles.map((article) => (
                <Grid item xs={12} sm={6} md={4} key={article.url}>
                  <Card>
                    {article.multimedia && article.multimedia.length > 0 && (
                      <CardMedia component="img" height="140" image={article.multimedia[0].url} alt={article.title} />
                    )}
                    <CardContent>
                      <Typography variant="h6">{article.title}</Typography>
                      <Typography variant="body2" color="textSecondary">{article.abstract}</Typography>
                    </CardContent>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      Read More
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => addToReadLater(article)}
                    >
                      Read Later
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination count={10} page={page} onChange={(e, value) => setPage(value)} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
