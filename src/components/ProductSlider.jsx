import React from 'react';
import { Box, Card, CardMedia, Typography, Button, Link } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


export default function ProductSlider({products}) {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        navigation
        loop={false}
        breakpoints={{
          600: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.2 },
          1200: { slidesPerView: 4 }
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card
              sx={{
                maxWidth: 300,
                margin: 'auto',
                borderRadius: 2,
                boxShadow: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' }
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.primary">
                  {product.brand}
                </Typography>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  EGP {product.price}
                </Typography>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}