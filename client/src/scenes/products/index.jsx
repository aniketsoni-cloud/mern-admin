import React from "react";
import { Box } from "@mui/material";

import { useGetProductsQuery } from "state/api";
import { Header } from "components";
import { ProductList } from "components/ProductList";

// Products
const Products = () => {
  // get data from API with error handling
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {/* Product List Component with TypeScript, Charts, INR, and Accessibility */}
      <ProductList data={data} isLoading={isLoading} error={error} />
    </Box>
  );
};

export default Products;
