import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { Product } from 'types/product.types';
import { getMockProducts } from 'api/mockProducts';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getMockProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products.');
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress size={20} aria-label="Loading..." color="secondary" />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
