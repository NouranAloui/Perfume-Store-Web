import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import {
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

export default function Womens() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const useFilterByCategory = (items, category) => {
    
      if (!items || !Array.isArray(items)) return [];
      
      if (!category) return [...items];

      return items.filter(item => 
        item.category?.toLowerCase() === category.toLowerCase()
      );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://683e08ca1cd60dca33da3eac.mockapi.io/products'); 
        const data = await response.json();
        
        const filteredItems = useFilterByCategory(data, 'women');
        setItems(filteredItems);
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
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
        Women's
      </Typography>

      <ProductGrid
        items={items}
        totalPages={totalPages}
        page={page}
      />
    </>
  );
}