import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";

const labelProps = {
  mt: 2,
  mb: 1,
  fontWeight: "bold",
  fontSize: "14px",
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ ...inputs, actors })
      .then((res) => {
        console.log(res);
        // Reset form after submission if needed
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "70%", md: "50%" },
        padding: 4,
        margin: "2rem auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        mb={3}
        color="#2b2d42"
      >
        🎬 Add a New Movie
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormLabel sx={labelProps}>Movie Title</FormLabel>
        <TextField
          fullWidth
          name="title"
          value={inputs.title}
          onChange={handleChange}
          variant="outlined"
        />

        <FormLabel sx={labelProps}>Description</FormLabel>
        <TextField
          fullWidth
          name="description"
          value={inputs.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={3}
        />

        <FormLabel sx={labelProps}>Poster URL</FormLabel>
        <TextField
          fullWidth
          name="posterUrl"
          value={inputs.posterUrl}
          onChange={handleChange}
          variant="outlined"
        />

        <FormLabel sx={labelProps}>Release Date</FormLabel>
        <TextField
          fullWidth
          type="date"
          name="releaseDate"
          value={inputs.releaseDate}
          onChange={handleChange}
          variant="outlined"
        />

        <FormLabel sx={labelProps}>Actors</FormLabel>
        <Box display="flex" gap={1} alignItems="center">
          <TextField
            fullWidth
            name="actor"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            variant="outlined"
            placeholder="Add an actor"
          />
          <Button
            onClick={() => {
              if (actor.trim()) {
                setActors((prev) => [...prev, actor]);
                setActor("");
              }
            }}
            variant="contained"
            sx={{ whiteSpace: "nowrap" }}
          >
            Add
          </Button>
        </Box>

        {actors.length > 0 && (
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {actors.map((act, idx) => (
              <Chip
                key={idx}
                label={act}
                onDelete={() =>
                  setActors(actors.filter((a, i) => i !== idx))
                }
                color="primary"
              />
            ))}
          </Stack>
        )}

        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox
            checked={inputs.featured}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                featured: e.target.checked,
              }))
            }
          />
          <FormLabel sx={{ fontWeight: "bold" }}>Featured Movie</FormLabel>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: "bold",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#1e1f2a",
            },
          }}
        >
          Submit Movie
        </Button>
      </form>
    </Box>
  );
};

export default AddMovie;
