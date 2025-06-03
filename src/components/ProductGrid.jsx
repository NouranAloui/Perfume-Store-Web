 import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Pagination,
} from '@mui/material';

export default function ProductGrid({
  items = [],
  totalPages = 1,
  page = 1,
  onPageChange = () => {},
}) {
  return (
    <Box sx={{ flexGrow: 1, px: 2, py: 4 }}>
      {/* Product Grid */}
      <Grid container spacing={3} justifyContent="center">
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                margin: 'auto',
                borderRadius: 2,
                boxShadow: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover', width: '300px', height: '350px' }}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {product.brand}
                </Typography>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  EGP {product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}