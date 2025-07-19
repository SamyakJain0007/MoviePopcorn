import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Tab, Tabs, TextField } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { getAllMovies } from "../api-helpers/api-helpers";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (movie) {
      navigate(`/booking/${movie._id}`);
    }
  };

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#111",
        padding: "10px 0",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <MovieIcon sx={{ color: "#F53163", fontSize: "2rem", mr: 1 }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              cursor: "pointer",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.5px",
            }}
            onClick={() => navigate("/")}
          >
            Popcorn Go
          </Typography>
        </Box>

        <Box sx={{ width: "30%", minWidth: "250px" }}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="🔍 Search for a movie..."
                variant="outlined"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "30px",
                  input: {
                    color: "#fff",
                    paddingLeft: "12px",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "&::placeholder": {
                      color: "#ccc",
                      fontStyle: "italic",
                      fontSize: "0.9rem",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#90caf9",
                    },
                  },
                }}
              />
            )}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
            sx={{
              "& .MuiTab-root": {
                color: "#bbb",
                fontWeight: 500,
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#fff !important",
              },
            }}
          >
            <Tab label="Movies" onClick={() => navigate("/movies")} />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" onClick={() => navigate("/admin")} />
                <Tab label="Auth" onClick={() => navigate("/auth")} />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" onClick={() => navigate("/user")} />
                <Tab label="Logout" onClick={() => logout(false)} />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Movie" onClick={() => navigate("/add")} />
                <Tab label="Admin Profile" onClick={() => navigate("/user-admin")} />
                <Tab label="Logout" onClick={() => logout(true)} />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
