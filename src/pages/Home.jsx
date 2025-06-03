import {React, useEffect, useState} from 'react';
import axios from 'axios';
import HeroSlider from '../components/HeroSlider';
import ProductSlider from '../components/ProductSlider';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home() {
 
  const [itemsNewest, setItemsNewest] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get('https://683e08ca1cd60dca33da3eac.mockapi.io/newest'); 
        const res2 = await axios.get('https://683e08ca1cd60dca33da3eac.mockapi.io/products?limit=5&page=2');

        setItemsNewest(response.data);
        setItems(res2.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
    <CircularProgress color="primary" thickness={4} />
    <Typography sx={{ ml: 2 }}>Loading...</Typography>
  </Box>
);

if (error) return (
  <Box sx={{ textAlign: 'center', my: 4 }}>
    <Typography color="error">Error fetching data</Typography>
  </Box>
);

  return (
    <div>
      <HeroSlider slides={itemsNewest} />
      <Typography variant="h4" align="center" gutterBottom>
        Best Selling
      </Typography>
      <ProductSlider products={items} />
      <div style={{alignContent: 'center', textAlign: 'center', padding: '20px'}}>
        <h1>Our Story</h1>
        <p>For 30 years we have been selling the widest range of women's perfumes and men's aftershaves at affordable prices. We stock the fragrances of nearly 130 brands including Hugo Boss, Paco Rabanne, Gucci, Ariana Grande, Mugler and Marc Jacobs both online and across our network of over 215 nationwide stores. We also stock the luxury perfume brands Dior, Tom Ford, Viktor & Rolf, Hermès and Maison Margiela.</p>

        <p>Not only do we have the experience of selling perfumes, we also have the expertise to match. Our staff are trained and developed so that they are the most knowledgeable sales advisors within the perfume industry, we have the largest number of Fragrance Foundation fragrance graduates nationwide and a fragrance finder to guide your online shopping.</p>

        <p>We have been voted the Fragrance Foundation Online Retailer of the Year for the past 5 years. Online we offer FREE standard delivery on all orders for our VIP members, click and collect in 30 minutes and we've even introduced a “Try Me” option on some of our most popular products where you'll receive a free sample, so if you're choosing a new perfume or aftershave you can smell that before you open your order. Our VIP members can select a sample at checkout and have the opportunity to earn rewards while they shop. You can checkout straight away using our card payment options, or choose to buy now pay later using Klarna.</p>

        <p>We offer gift wrap, bottle engraving and personalised ribbon services online and across selected stores, plus you can recycle any bottle of fragrance with us instore and receive 15% off your next shop and choose from a range of refillable and vegan fragrances.</p>
      </div>
    </div>
  );
};

 
export default Home