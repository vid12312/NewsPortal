import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Pagination, Box } from '@mui/material';

const ReadLaterPage = () => {
  const [readLaterArticles, setReadLaterArticles] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('readLater')) || [];
    setReadLaterArticles(savedArticles);
  }, []);

  const handleRemove = (url) => {
    const updatedArticles = readLaterArticles.filter(article => article.url !== url);
    setReadLaterArticles(updatedArticles);
    localStorage.setItem('readLater', JSON.stringify(updatedArticles));
  };

  const paginatedArticles = readLaterArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>Read Later</Typography>
      <Grid container spacing={3}>
        {paginatedArticles.map((article) => (
          <Grid item xs={12} key={article.url}>
            <Card>
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="textSecondary">{article.abstract}</Typography>
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
                  onClick={() => handleRemove(article.url)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(readLaterArticles.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};

export default ReadLaterPage;
