import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
  Slide,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const labelStyle = {
  mt: 1,
  mb: 0.5,
  fontWeight: 'bold',
  color: '#ffffff',
};

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 20,
          backdropFilter: 'blur(12px)',
          background: 'rgba(0,0,0,0.7)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.37)',
        },
      }}
      open={true}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down' }}
    >
      <Box sx={{ ml: 'auto', p: 1 }}>
        <IconButton LinkComponent={Link} to="/" sx={{ color: '#fff' }}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #FF416C, #FF4B2B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        {isSignup ? 'Signup' : 'Login'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          padding={5}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width={400}
          mx="auto"
          gap={1}
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                variant="filled"
                type="text"
                name="name"
                InputProps={{ style: { color: 'white' } }}
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="filled"
            type="email"
            name="email"
            InputProps={{ style: { color: 'white' } }}
          />

          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="filled"
            type="password"
            name="password"
            InputProps={{ style: { color: 'white' } }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              borderRadius: 10,
              background: 'linear-gradient(90deg, #FF416C, #FF4B2B)',
              color: 'white',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'linear-gradient(90deg, #FF4B2B, #FF416C)',
              },
            }}
          >
            {isSignup ? 'Signup' : 'Login'}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 10,
                color: '#bbb',
                '&:hover': { color: 'white' },
              }}
            >
              Switch to {isSignup ? 'Login' : 'Signup'}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
