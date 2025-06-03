// Footer.js
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 3,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      {/* Subscribe Section */}
      <Box sx={{ mb: 3, color: '#F8F0EB' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Subscribe to our newsletter
        </Typography>
        <Typography variant="body2"  sx={{ mb: 2 }}>
          Get the latest updates on new perfumes and exclusive offers!
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            position: 'relative',
            display: 'inline-flex',
            maxWidth: 400,
            width: '100%',
            justifyContent: 'center',
            mx: 'auto'
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            type="email"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                color: '#F8F0EB'
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              borderRadius: '20px',
              paddingX: 2,
              fontSize: '0.75rem',
              height: 30,
              boxShadow: 3,
              whiteSpace: 'nowrap',
              bgcolor: 'background.default',
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'background.paper',
                color:'text.primary',
              }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" color= '#F8F0EB'>
        © 2025 Perfume Store. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;