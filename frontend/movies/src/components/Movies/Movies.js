import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../../api-helpers/api-helpers';
import { Box, Typography } from '@mui/material';
import MovieItem from './MovieItem';
import { motion } from 'framer-motion';

const Movies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box marginTop={4}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h4"
          padding={2}
          sx={{
            width: "fit-content",
            margin: "0 auto",
            bgcolor: "#900C3F",
            color: "white",
            borderRadius: "12px",
            boxShadow: 3,
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          🎬 All Movies 🎬
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
