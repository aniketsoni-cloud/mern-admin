# ProductList Component - Code Examples

Comprehensive code examples for the ProductList component.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [With API Integration](#with-api-integration)
3. [Custom Styling](#custom-styling)
4. [Event Handlers](#event-handlers)
5. [Currency Formatting](#currency-formatting)
6. [Error Handling](#error-handling)
7. [Loading States](#loading-states)
8. [Accessibility Features](#accessibility-features)
9. [Testing Examples](#testing-examples)
10. [Advanced Use Cases](#advanced-use-cases)

---

## Basic Usage

### Minimal Example

```tsx
import { ProductList } from 'components/ProductList';

export default function MyProductsPage() {
  return <ProductList />;
}
```

### With Header

```tsx
import { Box } from '@mui/material';
import { ProductList } from 'components/ProductList';
import { Header } from 'components';

export default function MyProductsPage() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subtitle="Browse our product catalog" />
      <ProductList />
    </Box>
  );
}
```

---

## With API Integration

### RTK Query Integration

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

export default function MyProductsPage() {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <ProductList
      products={data}
      isLoading={isLoading}
      error={error ? new Error(error.message) : null}
    />
  );
}
```

### Custom Fetch Hook

```tsx
import { useState, useEffect } from 'react';
import { ProductList } from 'components/ProductList';
import { fetchProducts } from 'services/mockProductApi';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchProducts();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setProducts(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

### Axios Integration

```tsx
import { useState, useEffect } from 'react';
import { ProductList } from 'components/ProductList';
import axios from 'axios';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/products')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

---

## Custom Styling

### With Custom Container

```tsx
import { Box, Paper } from '@mui/material';
import { ProductList } from 'components/ProductList';

export default function MyProductsPage() {
  return (
    <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 2 }}>
      <ProductList showCharts={true} />
    </Paper>
  );
}
```

### With Custom Theme

```tsx
import { ThemeProvider, createTheme } from '@mui/material';
import { ProductList } from 'components/ProductList';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function MyProductsPage() {
  return (
    <ThemeProvider theme={customTheme}>
      <ProductList />
    </ThemeProvider>
  );
}
```

---

## Event Handlers

### Product Click Navigation

```tsx
import { ProductList } from 'components/ProductList';
import { useNavigate } from 'react-router-dom';
import { Product } from 'types/product.types';

export default function MyProductsPage() {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product._id}`);
  };

  return <ProductList onProductClick={handleProductClick} />;
}
```

### Product Click with Modal

```tsx
import { useState } from 'react';
import { ProductList } from 'components/ProductList';
import { Product } from 'types/product.types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function MyProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductList onProductClick={handleProductClick} />
      
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          <p>{selectedProduct?.description}</p>
          <p>Price: ₹{selectedProduct?.price}</p>
          <p>Rating: {selectedProduct?.rating} ★</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Product Click with Redux

```tsx
import { ProductList } from 'components/ProductList';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from 'state/productsSlice';
import { Product } from 'types/product.types';

export default function MyProductsPage() {
  const dispatch = useDispatch();

  const handleProductClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  return <ProductList onProductClick={handleProductClick} />;
}
```

---

## Currency Formatting

### INR Currency (Default)

```tsx
import { ProductList } from 'components/ProductList';

export default function MyProductsPage() {
  return <ProductList currency="INR" />;
}
```

### USD Currency

```tsx
import { ProductList } from 'components/ProductList';

export default function MyProductsPage() {
  return <ProductList currency="USD" />;
}
```

### Dynamic Currency Based on User Location

```tsx
import { useState, useEffect } from 'react';
import { ProductList } from 'components/ProductList';

export default function MyProductsPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  useEffect(() => {
    // Detect user's location and set currency
    const userLocation = getUserLocation(); // Your location detection logic
    setCurrency(userLocation === 'IN' ? 'INR' : 'USD');
  }, []);

  return <ProductList currency={currency} />;
}
```

---

## Error Handling

### Custom Error Display

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Alert, Box } from '@mui/material';

export default function MyProductsPage() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (error && error.status === 403) {
    return (
      <Box m={3}>
        <Alert severity="warning">
          You don't have permission to view products.
        </Alert>
      </Box>
    );
  }

  return (
    <ProductList
      products={data}
      isLoading={isLoading}
      error={error ? new Error(error.message) : null}
    />
  );
}
```

### Retry with Exponential Backoff

```tsx
import { useState, useEffect, useCallback } from 'react';
import { ProductList } from 'components/ProductList';
import { fetchProducts } from 'services/mockProductApi';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchProducts();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setProducts(response.data || []);
      setRetryCount(0); // Reset on success
    } catch (err) {
      setError(err);
      
      // Auto-retry with exponential backoff
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, delay);
      }
    } finally {
      setIsLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

---

## Loading States

### Custom Loading Indicator

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function MyProductsPage() {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6">Loading amazing products...</Typography>
      </Box>
    );
  }

  return <ProductList products={data} isLoading={false} />;
}
```

### Skeleton Loading

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Grid, Skeleton, Box } from '@mui/material';

export default function MyProductsPage() {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Box p={3}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Skeleton variant="rectangular" height={300} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return <ProductList products={data} isLoading={false} />;
}
```

---

## Accessibility Features

### Custom ARIA Announcements

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { announceToScreenReader } from 'utils/accessibility.utils';
import { useEffect } from 'react';

export default function MyProductsPage() {
  const { data, isLoading, error } = useGetProductsQuery();

  useEffect(() => {
    if (data) {
      announceToScreenReader(
        `${data.length} products loaded successfully`,
        'polite'
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      announceToScreenReader('Error loading products', 'assertive');
    }
  }, [error]);

  return (
    <ProductList
      products={data}
      isLoading={isLoading}
      error={error ? new Error(error.message) : null}
    />
  );
}
```

### Skip to Content Link

```tsx
import { ProductList } from 'components/ProductList';
import { Box, Link } from '@mui/material';

export default function MyProductsPage() {
  return (
    <>
      <Link
        href="#product-list-main"
        sx={{
          position: 'absolute',
          left: '-9999px',
          '&:focus': {
            position: 'static',
            left: 0,
          },
        }}
      >
        Skip to product list
      </Link>
      
      <Box id="product-list-main">
        <ProductList />
      </Box>
    </>
  );
}
```

---

## Testing Examples

### Basic Component Test

```tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { ProductList } from 'components/ProductList';

test('renders ProductList component', () => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 1000,
      rating: 4.5,
      category: 'Test',
      supply: 100,
      stat: [{ yearlySalesTotal: 100000, yearlyTotalSoldUnits: 100 }],
    },
  ];

  render(
    <ThemeProvider theme={createTheme()}>
      <ProductList products={mockProducts} isLoading={false} />
    </ThemeProvider>
  );

  expect(screen.getByText('Test Product')).toBeInTheDocument();
});
```

### Integration Test with Redux

```tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import MyProductsPage from './MyProductsPage';
import { store } from 'state/store';

test('ProductsPage integration', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={createTheme()}>
          <MyProductsPage />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  // Wait for products to load
  const productName = await screen.findByText(/Product/i);
  expect(productName).toBeInTheDocument();
});
```

---

## Advanced Use Cases

### Filtered Products by Category

```tsx
import { useMemo } from 'react';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { useParams } from 'react-router-dom';

export default function CategoryProducts() {
  const { category } = useParams<{ category: string }>();
  const { data, isLoading } = useGetProductsQuery();

  const filteredProducts = useMemo(() => {
    return data?.filter(p => p.category === category) || [];
  }, [data, category]);

  return (
    <ProductList
      products={filteredProducts}
      isLoading={isLoading}
      showCharts={false}
    />
  );
}
```

### Products with Real-time Updates

```tsx
import { useState, useEffect } from 'react';
import { ProductList } from 'components/ProductList';
import { Product } from 'types/product.types';

export default function RealtimeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Connect to WebSocket or polling
    const ws = new WebSocket('ws://localhost:8080/products');

    ws.onmessage = (event) => {
      const updatedProducts = JSON.parse(event.data);
      setProducts(updatedProducts);
      setIsLoading(false);
    };

    ws.onerror = () => {
      setIsLoading(false);
    };

    return () => ws.close();
  }, []);

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
    />
  );
}
```

### Products with Infinite Scroll

```tsx
import { useState, useEffect, useCallback } from 'react';
import { ProductList } from 'components/ProductList';
import { Box, Button } from '@mui/material';

export default function InfiniteScrollProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?page=${page}&limit=12`);
      const data = await response.json();
      
      setProducts(prev => [...prev, ...data.products]);
      setHasMore(data.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
      <ProductList products={products} isLoading={isLoading} showCharts={false} />
      
      {hasMore && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            onClick={loadMore}
            disabled={isLoading}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
}
```

### Products with Price Range Filter

```tsx
import { useState, useMemo } from 'react';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Box, Slider, Typography } from '@mui/material';

export default function PriceFilteredProducts() {
  const { data, isLoading } = useGetProductsQuery();
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000]);

  const filteredProducts = useMemo(() => {
    return data?.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    ) || [];
  }, [data, priceRange]);

  return (
    <>
      <Box p={3}>
        <Typography gutterBottom>
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={50000}
          step={100}
        />
      </Box>
      
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
      />
    </>
  );
}
```

---

## Performance Optimization

### Memoized Product List

```tsx
import { memo } from 'react';
import { ProductList } from 'components/ProductList';
import { ProductListProps } from 'types/product.types';

const MemoizedProductList = memo<ProductListProps>(
  ProductList,
  (prevProps, nextProps) => {
    return (
      prevProps.products === nextProps.products &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.error === nextProps.error
    );
  }
);

export default function OptimizedProductsPage() {
  return <MemoizedProductList />;
}
```

### Lazy Loaded Component

```tsx
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const ProductList = lazy(() => import('components/ProductList'));

export default function LazyProductsPage() {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      }
    >
      <ProductList />
    </Suspense>
  );
}
```

---

These examples cover most common use cases. Customize them according to your specific requirements!
