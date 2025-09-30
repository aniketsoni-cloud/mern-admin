/**
 * ProductList Component
 * Main modular, accessible product list component with TypeScript
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
  Collapse,
  useTheme,
  useMediaQuery,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  BarChart as ChartIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { ProductListProps, Product } from '../../types/product.types';
import { ProductCard } from './ProductCard';
import { ProductCharts } from './ProductCharts';
import { fetchProducts } from '../../services/mockProductApi';
import { announceToScreenReader } from '../../utils/accessibility.utils';

export const ProductList: React.FC<ProductListProps> = ({
  products: propProducts,
  isLoading: propIsLoading,
  error: propError,
  onProductClick,
  showCharts = true,
  currency = 'INR',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // State management
  const [products, setProducts] = useState<Product[]>(propProducts || []);
  const [isLoading, setIsLoading] = useState<boolean>(propIsLoading || false);
  const [error, setError] = useState<Error | null>(propError || null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showChartsState, setShowChartsState] = useState<boolean>(showCharts);
  const [retryCount, setRetryCount] = useState<number>(0);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch products if not provided via props
  useEffect(() => {
    if (!propProducts) {
      loadProducts();
    }
  }, [propProducts, retryCount]);

  // Update products when props change
  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
    }
  }, [propProducts]);

  // Update loading state when props change
  useEffect(() => {
    if (propIsLoading !== undefined) {
      setIsLoading(propIsLoading);
    }
  }, [propIsLoading]);

  // Update error state when props change
  useEffect(() => {
    if (propError !== undefined) {
      setError(propError);
    }
  }, [propError]);

  // Load products from API
  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchProducts();
      
      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data) {
        setProducts(response.data);
        announceToScreenReader(
          `${response.data.length} products loaded successfully`,
          'polite'
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(new Error(errorMessage));
      announceToScreenReader(`Error: ${errorMessage}`, 'assertive');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle retry
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'revenue':
          const revenueA = a.stat[0]?.yearlySalesTotal || 0;
          const revenueB = b.stat[0]?.yearlySalesTotal || 0;
          return revenueB - revenueA;
        default:
          return 0;
      }
    });

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    announceToScreenReader(
      `${filteredProducts.length} products found for "${value}"`,
      'polite'
    );
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    searchInputRef.current?.focus();
    announceToScreenReader('Search cleared', 'polite');
  };

  // Calculate grid columns based on screen size
  const gridColumns = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <Box
      sx={{ p: { xs: 2, sm: 3 } }}
      role="main"
      aria-label="Product List"
    >
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          Products
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse our collection of {products.length} products
        </Typography>
      </Box>

      {/* Search and Filter Controls */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              inputRef={searchInputRef}
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <Tooltip title="Clear search">
                      <IconButton
                        aria-label="Clear search"
                        onClick={handleClearSearch}
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              aria-label="Search products"
              aria-describedby="search-help-text"
            />
          </Grid>

          {/* Filter Toggle Button */}
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              Filters
            </Button>
          </Grid>

          {/* Refresh Button */}
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
              disabled={isLoading}
              aria-label="Refresh product list"
            >
              Refresh
            </Button>
          </Grid>
        </Grid>

        {/* Filter Panel */}
        <Collapse in={showFilters} id="filter-panel" role="region" aria-label="Filter controls">
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Grid container spacing={2}>
              {/* Category Filter */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-filter-label">Category</InputLabel>
                  <Select
                    labelId="category-filter-label"
                    value={categoryFilter}
                    label="Category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    aria-label="Filter by category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sort By */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="sort-by-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products by"
                  >
                    <MenuItem value="name">Name (A-Z)</MenuItem>
                    <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                    <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                    <MenuItem value="rating">Rating (High to Low)</MenuItem>
                    <MenuItem value="revenue">Revenue (High to Low)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Show Charts Toggle */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showChartsState}
                      onChange={(e) => setShowChartsState(e.target.checked)}
                      inputProps={{ 'aria-label': 'Toggle analytics charts' }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ChartIcon fontSize="small" />
                      <Typography variant="body2">Show Analytics Charts</Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>

      {/* Results Count */}
      {!isLoading && !error && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
          role="status"
          aria-live="polite"
        >
          Showing {filteredProducts.length} of {products.length} products
        </Typography>
      )}

      {/* Error State */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Retry
            </Button>
          }
          role="alert"
        >
          <AlertTitle>Error Loading Products</AlertTitle>
          {error.message}
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
          role="status"
          aria-label="Loading products"
        >
          <CircularProgress
            size={40}
            aria-label="Loading..."
            color="secondary"
          />
        </Box>
      )}

      {/* Product Grid */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard
                product={product}
                onClick={onProductClick}
                currency={currency}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredProducts.length === 0 && (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Typography variant="h6" gutterBottom>
            No Products Found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm || categoryFilter !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'No products available at this time'}
          </Typography>
          {(searchTerm || categoryFilter !== 'all') && (
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </Paper>
      )}

      {/* Charts Section */}
      {!isLoading && !error && showChartsState && filteredProducts.length > 0 && (
        <ProductCharts products={filteredProducts} />
      )}
    </Box>
  );
};

export default ProductList;
