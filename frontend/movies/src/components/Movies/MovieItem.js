import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleButtonClick = () => {
    if (isUserLoggedIn) {
      navigate(`/booking/${id}`);
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      style={{
        margin: "1.5rem",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
      }}
    >
      <Card
        sx={{
          width: 280,
          height: 420,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,240,240,0.6))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.4s ease-in-out",
        }}
      >
        {/* Poster Image */}
        <Box
          sx={{
            height: "60%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
          }}
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            src={posterUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              transition: "transform 0.4s ease-in-out",
            }}
          />
        </Box>

        {/* Movie Info */}
        <CardContent sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#222",
              textAlign: "center",
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              fontSize: "0.85rem",
              color: "#555",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Released: {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>

        {/* Book Button */}
        <CardActions sx={{ padding: "0 1.5rem 1rem" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleButtonClick}
            sx={{
              background:
                "linear-gradient(135deg, #F53163 0%, #FF8E53 100%)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: "'Poppins', sans-serif",
              transition: "0.3s ease-in-out",
              ":hover": {
                background:
                  "linear-gradient(135deg, #121217, #2d2e32)",
                transform: "scale(1.05)",
              },
            }}
          >
            Book Now
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default MovieItem;
