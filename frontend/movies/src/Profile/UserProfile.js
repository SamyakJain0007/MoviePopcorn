import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getUserBooking, getUserDetails, deleteBooking } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    getUserBooking().then((res) => setBookings(res.bookings)).catch(console.log);
    getUserDetails().then((res) => setUser(res.user)).catch(console.log);
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => setBookings((prev) => prev.filter((b) => b._id !== id)))
      .catch(console.log);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        py: 4,
        maxWidth: "100%",
        overflowX: "hidden",
        bgcolor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Profile Card */}
      {user && (
        <Card
          sx={{
            width: isMobile ? "100%" : "50%",
            mb: 4,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "#ffffff",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                bgcolor: "#900C3F",
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Booking Section */}
      <Box
        sx={{
          width: isMobile ? "100%" : "70%",
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: 600 }}>
          🎟️ Your Bookings
        </Typography>

        {bookings.length > 0 ? (
          <List sx={{ maxHeight: "60vh", overflowY: "auto" }}>
            {bookings.map((booking, index) => (
              <Box key={booking._id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(booking._id)} color="error">
                      <DeleteForeverIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`🎬 ${booking.movie.title}`}
                    secondary={
                      <>
                        Seat: {booking.seatNumber} |{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </>
                    }
                  />
                </ListItem>
                {index !== bookings.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
          >
            No bookings yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
