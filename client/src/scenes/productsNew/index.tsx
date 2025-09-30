/**
 * Enhanced Products Page
 * Demonstrates the new ProductList component with all features
 */

import React from 'react';
import { Box } from '@mui/material';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Header } from 'components';

const ProductsNew: React.FC = () => {
  // Fetch products using RTK Query
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header 
        title="PRODUCTS" 
        subtitle="Enhanced product list with analytics, search, and accessibility features." 
      />

      {/* ProductList Component with all features enabled */}
      <ProductList
        products={data}
        isLoading={isLoading}
        showCharts={true}
        currency="INR"
        onProductClick={(product) => {
          console.log('Product clicked:', product);
          // Add your navigation or modal logic here
          // e.g., navigate(`/products/${product._id}`);
        }}
      />
    </Box>
  );
};

export default ProductsNew;
