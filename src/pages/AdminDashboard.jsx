// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  CircularProgress,
  CardMedia,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { auth, createUserWithEmailAndPassword, handleLogout } from "../firebase";

const drawerWidth = 240;

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openProductModalEdit, setOpenProductModalEdit] = useState(false);

  // State for product editing
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');
  const [editProductBrand, setEditProductBrand] = useState('');
  const [editSelectedGender, setEditSelectedGender] = useState('');
  const [editImage, setEditImage] = useState(null);


  // Product form state
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('');
  const [selectedGender, setSelectedGender] = useState('women');
  const [image, setImage] = useState(null);

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    // Fetch initial product data
    fetchData();
  },[]);

  const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://683e08ca1cd60dca33da3eac.mockapi.io/products`);
 
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Filter products by search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add product
  const handleAddProduct = () => {
    const newProduct = {
      name: newProductName,
      price: parseFloat(newProductPrice),
      brand: newProductBrand,
      category: selectedGender,
      image: image ? URL.createObjectURL(image) : null,
    };
    
    axios.post('https://683e08ca1cd60dca33da3eac.mockapi.io/products',  newProduct)
    .then(res => {
       
      toast.success('Product added successfully!');

      setProducts((prev) => [...prev, newProduct]);
      setNewProductName('');
      setNewProductPrice('');
      setNewProductBrand('');
      setSelectedGender('');
      setImage(null);
      setOpenProductModal(false);
    })
    .catch(err => {
      console.error('Error adding product:', err);
      toast.error('Failed to add product');
    });
  };

  // Edit product
  const handleEditProduct = () => {
    const updatedProduct = {
      id: editProductId,
      name: editProductName,
      price: parseFloat(editProductPrice),
      brand: editProductBrand,
      category: editSelectedGender,
      image: editImage,
    };
    
    axios.put(`https://683e08ca1cd60dca33da3eac.mockapi.io/products/${editProductId}`, updatedProduct)
    .then(res => {  
      setProducts((prev) => prev.map(product => product.id === editProductId ? res.data : product));
      
      toast.success('Product updated successfully!');

      setProducts((prev) => prev.map(product => product.id === editProductId ? updatedProduct : product));  
      setEditProductId(null);
      setEditProductName('');
      setEditProductPrice('');
      setEditProductBrand('');
      setEditSelectedGender('');
      setOpenProductModalEdit(false);
    })
    .catch(err => {
     
      toast.error('Failed to update product');
    });
  };

  //delete product
  const handleDeleteProduct = (id) => {
    
    axios.delete(`https://683e08ca1cd60dca33da3eac.mockapi.io/products/${id}`)
      .then(() => {
        setProducts((prev) => prev.filter(p => p.id !== id));
        toast.success('Product deleted successfully!');
      })
      .catch(err => {
        toast.error('Failed to delete product');
      });
  }



  // Add admin
  const handleAddAdmin = async() => {
    try{
      await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      toast.success('Admin created successfully!');
    }
    catch (error) {
      toast.error(`Error creating admin`);
    }
    setAdminEmail('');
    setAdminPassword('');
    setOpenAdminModal(false);
  };

 

  // Drawer content
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{color:'text.suger'}}>
        {[
          { text: 'Add Product', onClick: () => setOpenProductModal(true) },
          { text: 'Add Admin', onClick: () => setOpenAdminModal(true) },
          { text: 'Log Out', onClick: handleLogout }
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon sx={{color:'text.suger'}} >
                {index  === 0 ? <AddIcon /> :<></>}
                {index === 1 ? <AdminPanelSettingsIcon /> :<></>}
                {index === 2 ? <ExitToAppIcon /> :<></>}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress color="primary" />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography color="error">Error fetching products</Typography>
      </Box>
    );
  }

  return (
    
    <Box sx={{ display: 'flex' }}>
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ bgcolor: 'background.paper',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { sm: '64px' }
        }}
      >
        <Toolbar />

        {/* Search Bar */}
        <TextField
          label="Search Products..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Product Grid */}
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image || null}
                    alt={product.name}
                    sx={{ objectFit: 'cover', mb: 2, width:'300px', height:'350px' }}
                  />
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    EGP {product.price}, {product.brand}
                  </Typography>
                  <Button size="small" variant="outlined" sx={{ mr: 1, mt: 1 }} onClick={() => {setEditProductId(product.id); setEditProductName(product.name); setEditProductPrice(product.price); setEditProductBrand(product.brand); setEditSelectedGender(product.category); setOpenProductModalEdit(true); setEditImage(product.image);}}>
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={()=>handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal: Add Product */}
      <Dialog open={openProductModal} onClose={() => setOpenProductModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Brand"
              value={newProductBrand}
              onChange={(e) => setNewProductBrand(e.target.value)}
              fullWidth
              margin="normal"
            />

            {/* Gender Selection */}
            <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender-group-label"
                name="gender-buttons-group"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <FormControlLabel value="women" control={<Radio />} label="Women's" />
                <FormControlLabel value="men" control={<Radio />} label="Men's" />
              </RadioGroup>
            </FormControl>

            {/* Image Upload
            <Box sx={{ mt: 2 }}>
              <Button sx={{bgcolor: 'background.default', color:'black'}} variant="contained" component="label" fullWidth>
                Upload Image
                <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files?.[0] || null)} />
              </Button>
              {image && <Typography sx={{ mt: 1 }}>{image.name}</Typography>}
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions >
          <Button sx={{color: 'background.default'}} onClick={() => setOpenProductModal(false)}>Cancel</Button>
          <Button sx={{bgcolor: 'background.default', color:'black'}} onClick={handleAddProduct} variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal: Edit Product */}
      <Dialog open={openProductModalEdit} onClose={() => setOpenProductModalEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={editProductName}
              onChange={(e) => setEditProductName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              value={editProductPrice}
              onChange={(e) => setEditProductPrice(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Brand"
              value={editProductBrand}
              onChange={(e) => setEditProductBrand(e.target.value)}
              fullWidth
              margin="normal"
            />

            {/* Gender Selection */}
            <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender-group-label"
                name="gender-buttons-group"
                value={editSelectedGender}
                onChange={(e) => setEditSelectedGender(e.target.value)}
              >
                <FormControlLabel value="women" control={<Radio />} label="Women's" />
                <FormControlLabel value="men" control={<Radio />} label="Men's" />
              </RadioGroup>
            </FormControl>

          </Box>
        </DialogContent>
        <DialogActions >
          <Button sx={{color: 'background.default'}} onClick={() => setOpenProductModalEdit(false)}>Cancel</Button>
          <Button sx={{bgcolor: 'background.default', color:'black'}} onClick={handleEditProduct} variant="contained">
            Edit Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal: Add Admin */}
      <Dialog open={openAdminModal} onClose={() => setOpenAdminModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              fullWidth
              margin="normal"
              type="password"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'background.default'}} onClick={() => setOpenAdminModal(false)}>Cancel</Button>
          <Button sx={{bgcolor: 'background.default', color:'black'}} onClick={handleAddAdmin} variant="contained">
            Create Admin
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}