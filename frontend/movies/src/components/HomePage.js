import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            width: "90%",
            height: "70vh",
            margin: "auto",
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: 5,
            position: "relative",
          }}
        >
          <img
    src="/assets/poster.png"
  alt="Poster"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              filter: "brightness(60%)",
              transition: "transform 0.5s ease",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "2rem",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9))",
              color: "#fff",
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
            >
              Welcome to Popcorn Go 🍿
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
            >
              Watch Latest Movies Anytime, Anywhere
            </Typography>
            <Button
              component={Link}
              to="/movies"
              variant="contained"
              color="warning"
              size="large"
              endIcon={<PlayCircle />}
              sx={{
                fontWeight: "bold",
                paddingX: 4,
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: 4,
                ":hover": {
                  backgroundColor: "#ff5722",
                  transform: "scale(1.05)",
                },
              }}
            >
              Explore Now
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Latest Releases Section */}
      <Box sx={{ padding: 5 }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            🎬 Latest Releases
          </Typography>
        </motion.div>

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {movies &&
            movies.slice(0, 4).map((movie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <MovieItem
                  id={movie._id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                  releaseDate={movie.releaseDate}
                />
              </motion.div>
            ))}
        </Box>

        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            component={Link}
            to="/movies"
            variant="outlined"
            sx={{
              color: "#2b2d42",
              borderColor: "#2b2d42",
              fontWeight: "bold",
              px: 4,
              py: 1,
              borderRadius: "30px",
              '&:hover': {
                backgroundColor: "#2b2d42",
                color: "#fff",
              },
            }}
          >
            View All Movies
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
