import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById, deleteMovie } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Paper,
  Divider,
  Grow,
} from "@mui/material";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();

  const fetchAdminDetails = () => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const handleDelete = (id) => {
    deleteMovie(id)
      .then(() => fetchAdminDetails())
      .catch((err) => console.log(err));
  };

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      padding={4}
      sx={{ backgroundColor: "#f8f9fa" }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* Admin Info Section */}
        {admin && (
          <Box
            width="30%"
            bgcolor="#ffffff"
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={3}
            borderRight="1px solid #eee"
          >
            <AccountCircleIcon
              sx={{ fontSize: "8rem", color: "#00b894", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              Admin Info
            </Typography>
            <Divider sx={{ width: "60%", my: 2 }} />
            <Typography
              sx={{
                padding: 1,
                px: 3,
                borderRadius: 3,
                backgroundColor: "#f1f3f5",
                fontSize: "0.95rem",
              }}
            >
              Email: <strong>{admin.email}</strong>
            </Typography>
          </Box>
        )}

        {/* Movies List Section */}
        {admin && admin.addedMovies.length > 0 && (
          <Box width="70%" padding={3}>
            <Typography
              variant="h4"
              fontWeight="600"
              textAlign="center"
              color="#2d3436"
              mb={3}
              fontFamily="Segoe UI"
            >
              Movies Added by You
            </Typography>
            <List>
              {admin.addedMovies.map((movie, index) => (
                <Grow in timeout={300 * (index + 1)} key={movie._id}>
                  <ListItem
                    sx={{
                      bgcolor: "#dfe6e9",
                      borderRadius: 2,
                      mb: 2,
                      px: 3,
                      boxShadow: 2,
                      "&:hover": {
                        backgroundColor: "#b2bec3",
                        transform: "scale(1.01)",
                        transition: "0.3s ease-in-out",
                      },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={`🎬 ${movie.title}`}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#2d3436",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                </Grow>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AdminProfile;
