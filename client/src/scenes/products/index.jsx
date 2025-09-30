import React from 'react';
import { Box } from '@mui/material';
import { Header } from 'components';
import ProductList from 'components/products/ProductList';

const Products = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <ProductList />
    </Box>
  );
};


export default Products;
