import {
  Button,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        console.log(res);
        setOpenSnackbar(true); // Show success message
        setInputs({ seatNumber: "", date: "" }); // Reset form
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            variant="h3"
            fontWeight="bold"
            fontFamily="monospace"
            textAlign="center"
            mt={4}
            mb={2}
            sx={{
              color: "#222",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              transition: "0.3s ease-in-out",
              ":hover": {
                color: "#ff3d00",
                textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
              },
            }}
          >
            Book Tickets for: {movie.title}
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="flex-start"
            padding={4}
            gap={4}
          >
            {/* Movie Poster and Details */}
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "auto",
                  aspectRatio: "3/3",
                  objectFit: "",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease",
                }}
              />
              <Box mt={6} px={2}>
                <Typography variant="body1" mb={2}>
                  {movie.description}
                </Typography>
                <Typography fontWeight="bold" color="primary">
                  Starring: {movie.actors.join(", ")}
                </Typography>
                <Typography mt={1}>
                  Release Date:{" "}
                  <strong>{new Date(movie.releaseDate).toDateString()}</strong>
                </Typography>
              </Box>
            </Box>

            {/* Booking Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              flex={1}
              p={4}
              borderRadius={4}
              boxShadow="0 8px 24px rgba(0, 0, 0, 0.1)"
              sx={{
                backgroundColor: "#fafafa",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                textAlign="center"
                color="primary"
              >
                Fill Booking Details
              </Typography>

              <FormLabel>Seat Number</FormLabel>
              <TextField
                name="seatNumber"
                value={inputs.seatNumber}
                onChange={handleChange}
                type="number"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />

              <FormLabel>Booking Date</FormLabel>
              <TextField
                name="date"
                type="date"
                margin="normal"
                variant="outlined"
                value={inputs.date}
                onChange={handleChange}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  mt: 4,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  ":hover": {
                    backgroundColor: "#ff3d00",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Book Now
              </Button>
            </Box>
          </Box>

          {/* Snackbar for success */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity="success"
              onClose={() => setOpenSnackbar(false)}
              sx={{ width: "100%" }}
            >
              Booking successful!
            </Alert>
          </Snackbar>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
