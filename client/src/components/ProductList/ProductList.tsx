import React from 'react';
import { Box, CircularProgress, Typography, useMediaQuery, Alert } from '@mui/material';
import ProductCard from './ProductCard';
import { ProductListProps } from 'types/product.types';

const ProductList: React.FC<ProductListProps> = ({ data, isLoading, error }) => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  // Loading state
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        role="status"
        aria-live="polite"
        aria-label="Loading products"
      >
        <CircularProgress size={40} aria-label="Loading..." color="secondary" />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box mt="20px" role="alert" aria-live="assertive">
        <Alert severity="error">
          <Typography variant="h6">Failed to load products</Typography>
          <Typography variant="body2">{error.message || 'An error occurred'}</Typography>
        </Alert>
      </Box>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <Box mt="20px" role="status" aria-live="polite">
        <Alert severity="info">
          <Typography variant="h6">No products found</Typography>
          <Typography variant="body2">There are no products to display at this time.</Typography>
        </Alert>
      </Box>
    );
  }

  // Success state - render product grid
  return (
    <Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      justifyContent="space-between"
      rowGap="20px"
      columnGap="1.33%"
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
      }}
      role="list"
      aria-label="Products list"
    >
      {data.map((product) => (
        <Box key={product._id} role="listitem">
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
