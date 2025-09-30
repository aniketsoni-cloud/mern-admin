# Integration Guide for ProductList Component

This guide shows how to integrate the ProductList component into your existing MERN Admin Dashboard.

## Integration Steps

### Step 1: Install Dependencies

Run the following command to install required dependencies:

```bash
cd client
npm install chart.js react-chartjs-2
npm install --save-dev typescript @types/react @types/react-dom @types/node @types/jest
```

### Step 2: Replace Existing Products Component

The new ProductList component can replace the existing products page at `src/scenes/products/index.jsx`.

#### Option A: Complete Replacement

Replace the entire content of `src/scenes/products/index.jsx`:

```jsx
import React from 'react';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Box } from '@mui/material';
import { Header } from 'components';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <ProductList
        products={data}
        isLoading={isLoading}
        showCharts={true}
        currency="INR"
      />
    </Box>
  );
};

export default Products;
```

#### Option B: Side-by-Side Integration

Keep both versions and add a route for the new component:

1. Update `src/App.js` to add a new route:

```jsx
import { NewProducts } from "scenes";

// Inside Routes
<Route path="/products-new" element={<NewProducts />} />
```

2. Create `src/scenes/newProducts/index.jsx`:

```jsx
import React from 'react';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { Box } from '@mui/material';
import { Header } from 'components';

const NewProducts = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS (NEW)" subtitle="Enhanced product list with analytics." />
      <ProductList
        products={data}
        isLoading={isLoading}
        showCharts={true}
        currency="INR"
      />
    </Box>
  );
};

export default NewProducts;
```

### Step 3: Update Component Index

Add the ProductList export to `src/components/index.js`:

```javascript
export { ProductList, ProductCard, ProductCharts } from './ProductList';
```

### Step 4: Update Sidebar Navigation (Optional)

If you want to add a new menu item for the enhanced product list:

Update `src/components/Sidebar.jsx`:

```jsx
// Add to the menu items array
{
  text: "Products (New)",
  icon: <ShoppingCartOutlined />,
},
```

## Integration with Existing API

### Using RTK Query

The component works seamlessly with your existing RTK Query setup:

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <ProductList
      products={data}
      isLoading={isLoading}
      error={error ? new Error(error.data?.message || 'Failed to load') : null}
    />
  );
};
```

### Using Mock API for Testing

For development/testing without backend:

```tsx
import { ProductList } from 'components/ProductList';
import { setMockApiConfig } from 'services/mockProductApi';

// Configure mock API
setMockApiConfig({
  shouldFail: false,
  delayMs: 500,
});

const Products = () => {
  // Component will use mock API internally
  return <ProductList showCharts={true} currency="INR" />;
};
```

## Customization Examples

### Example 1: Custom Theme Colors

```tsx
import { ThemeProvider, createTheme } from '@mui/material';
import { ProductList } from 'components/ProductList';
import { themeSettings } from 'theme';

const Products = () => {
  const theme = createTheme(themeSettings('dark'));

  return (
    <ThemeProvider theme={theme}>
      <ProductList />
    </ThemeProvider>
  );
};
```

### Example 2: Product Click Navigation

```tsx
import { ProductList } from 'components/ProductList';
import { useNavigate } from 'react-router-dom';
import { Product } from 'types/product.types';

const Products = () => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    // Navigate to product detail page
    navigate(`/products/${product._id}`, { state: { product } });
  };

  return <ProductList onProductClick={handleProductClick} />;
};
```

### Example 3: Custom Currency Conversion

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
import { convertUSDToINR } from 'utils/currency.utils';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  // Convert prices if needed
  const productsInINR = data?.map(product => ({
    ...product,
    price: convertUSDToINR(product.price, 83),
  }));

  return (
    <ProductList
      products={productsInINR}
      isLoading={isLoading}
      currency="INR"
    />
  );
};
```

### Example 4: Filtered Products

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

const ElectronicsProducts = () => {
  const { data, isLoading } = useGetProductsQuery();

  // Pre-filter products
  const electronicsOnly = data?.filter(p => p.category === 'Electronics');

  return (
    <ProductList
      products={electronicsOnly}
      isLoading={isLoading}
      showCharts={true}
    />
  );
};
```

## TypeScript Migration

If you're migrating from JavaScript to TypeScript:

### Step 1: Rename Files

```bash
# Rename .jsx to .tsx
mv src/scenes/products/index.jsx src/scenes/products/index.tsx
```

### Step 2: Add Type Imports

```tsx
import { Product } from 'types/product.types';
import { FC } from 'react';
```

### Step 3: Type Your Component

```tsx
import { FC } from 'react';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

const Products: FC = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <ProductList
      products={data}
      isLoading={isLoading}
      error={error ? new Error(error.message) : null}
    />
  );
};

export default Products;
```

## Redux Integration

### Using Global Theme State

```tsx
import { ProductList } from 'components/ProductList';
import { useSelector } from 'react-redux';
import { RootState } from 'state';

const Products = () => {
  const mode = useSelector((state: RootState) => state.global.mode);

  return (
    <ProductList
      showCharts={true}
      currency="INR"
    />
  );
};
```

### Storing Selected Product

```tsx
import { ProductList } from 'components/ProductList';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from 'state/productsSlice';
import { Product } from 'types/product.types';

const Products = () => {
  const dispatch = useDispatch();

  const handleProductClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  return <ProductList onProductClick={handleProductClick} />;
};
```

## Performance Optimization

### Memoization

```tsx
import { useMemo } from 'react';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  // Memoize transformed data
  const processedProducts = useMemo(() => {
    return data?.map(product => ({
      ...product,
      // Add computed fields
      profitMargin: (product.price * 0.3).toFixed(2),
    }));
  }, [data]);

  return <ProductList products={processedProducts} isLoading={isLoading} />;
};
```

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const ProductList = lazy(() => import('components/ProductList'));

const Products = () => {
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
};
```

## Error Boundary Integration

```tsx
import { Component, ReactNode } from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ProductListErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box m={3}>
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
            }
          >
            <AlertTitle>Something went wrong</AlertTitle>
            {this.state.error?.message}
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Usage
const Products = () => (
  <ProductListErrorBoundary>
    <ProductList />
  </ProductListErrorBoundary>
);
```

## Testing Integration

### Test Setup

Create `src/setupTests.ts`:

```typescript
import '@testing-library/jest-dom';

// Mock Chart.js
jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Line: () => null,
  Doughnut: () => null,
}));
```

### Integration Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Products from 'scenes/products';
import { store } from 'state/store';

test('Products page integration', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={createTheme()}>
          <Products />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
});
```

## Troubleshooting

### Issue: TypeScript Errors

**Solution:** Ensure `tsconfig.json` is properly configured:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": "src"
  }
}
```

### Issue: Chart.js Not Rendering

**Solution:** Ensure Chart.js is properly registered:

```typescript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
```

### Issue: Theme Colors Not Applied

**Solution:** Wrap component in ThemeProvider:

```tsx
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

const Products = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = createTheme(themeSettings(mode));

  return (
    <ThemeProvider theme={theme}>
      <ProductList />
    </ThemeProvider>
  );
};
```

### Issue: API Data Format Mismatch

**Solution:** Transform data to match expected format:

```tsx
const transformedData = apiData?.map(item => ({
  _id: item.id,
  name: item.productName,
  description: item.desc,
  price: item.priceInCents / 100,
  rating: item.averageRating,
  category: item.cat,
  supply: item.stock,
  stat: [
    {
      yearlySalesTotal: item.totalSales,
      yearlyTotalSoldUnits: item.unitsSold,
    },
  ],
}));
```

## Migration Checklist

- [ ] Install dependencies (`chart.js`, `react-chartjs-2`, TypeScript types)
- [ ] Create `tsconfig.json` if not exists
- [ ] Copy component files to `src/components/ProductList/`
- [ ] Copy utility files to `src/utils/`
- [ ] Copy type definitions to `src/types/`
- [ ] Copy service files to `src/services/`
- [ ] Update component exports in `src/components/index.js`
- [ ] Test with mock API
- [ ] Integrate with existing API
- [ ] Update routing if needed
- [ ] Run tests (`npm test`)
- [ ] Test accessibility with screen reader
- [ ] Test responsive design on mobile
- [ ] Test dark/light theme switching
- [ ] Deploy and monitor

## Next Steps

1. **Customize** - Adjust styling and behavior to match your needs
2. **Extend** - Add more features like bulk actions, product comparison
3. **Optimize** - Implement pagination or virtual scrolling for large datasets
4. **Monitor** - Add analytics tracking for user interactions
5. **Document** - Update your project documentation with component usage

## Support

For additional help:
- Check the main [README.md](./README.md) for detailed documentation
- Review test files for usage examples
- Consult Material-UI documentation for theming
- See Chart.js documentation for chart customization
