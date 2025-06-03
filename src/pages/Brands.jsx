// Brands.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link
} from '@mui/material';
import axios from 'axios';

export default function Brands() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const [brands, setBrands] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://683e08ca1cd60dca33da3eac.mockapi.io/products'); 
        const productList = res.data;
        setItems(productList);

        // Extract unique brands
        const brandMap = {};

        productList.forEach(item => {
          const brand = item.brand;
          if (!brandMap[brand]) {
            brandMap[brand] = {
              brand,
              count: 0,
              image: item.image
            };
          }
          brandMap[brand].count += 1;
        });

        const brandList = Object.values(brandMap);
        setBrands(brandList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography color="error">Error fetching data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{  py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Brands
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {brands.map((brandObj, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <BrandCard brandData={brandObj} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

 
function BrandCard({ brandData }) {
  const { brand, image, count } = brandData;

  return (
      <Card
        sx={{
          textAlign: 'center',
          borderRadius: 2,
          boxShadow: 2,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.03)' }
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={brand}
          sx={{ objectFit: 'cover', width:'300px', height:'350px' }}
        />
        <CardContent>
          <Typography variant="h6" noWrap gutterBottom>
            {brand}
          </Typography>
          <Typography variant="body2" color='#F8F0EB'>
            {count} items
          </Typography>
        </CardContent>
      </Card>
  );
}