import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import {
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

export default function AllProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://683e08ca1cd60dca33da3eac.mockapi.io/products?limit=8&page=${page}`);
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        All Perfumes
      </Typography>

      <ProductGrid
        items={items}
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
  );
}