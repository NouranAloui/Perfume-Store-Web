import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png"; // Adjust the path as necessary

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }} role="presentation">
      <List>
        {['Home', 'All Products', 'Women\'s', 'Men\'s', 'Brands'].map((text) => (
          <ListItem button key={text} component={Link} to={
            text === 'Home' ? '/' :
            text === 'All Products' ? '/products' :
            text === 'Women\'s' ? '/women' :
            text === 'Men\'s' ? '/men' :
            '/brands'
          }>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'background.paper' }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Title / Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',   // This vertically centers items
              gap: 1,                 // Optional spacing between logo and text
            }}
          >
            <img src={logo} alt="Perfume World Logo" style={{ height: '50px' }} />
            <span>Perfume World</span>
          </Typography>

          {/* Desktop Links - Hidden on small screens */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } ,color: 'text.primary' }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/products">All Products</Button>
            <Button color="inherit" component={Link} to="/women">Women's</Button>
            <Button color="inherit" component={Link} to="/men">Men's</Button>
            <Button color="inherit" component={Link} to="/brands">Brands</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
