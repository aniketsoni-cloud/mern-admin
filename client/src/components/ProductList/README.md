# ProductList Component Documentation

A comprehensive, modular, and accessible ProductList component for MERN Admin Dashboard with TypeScript, responsive design, dark/light themes, Chart.js visualizations, INR localization, keyboard/ARIA accessibility, error handling, mock APIs, and unit tests.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Props](#props)
- [Components](#components)
- [API Integration](#api-integration)
- [Accessibility](#accessibility)
- [Theming](#theming)
- [Testing](#testing)
- [Examples](#examples)

## Features

✅ **TypeScript Support** - Fully typed with comprehensive type definitions  
✅ **Responsive Design** - Mobile-first approach with breakpoints for all screen sizes  
✅ **Dark/Light Themes** - Seamless integration with Material-UI theme system  
✅ **Chart.js Visualizations** - Interactive charts for product analytics  
✅ **INR Localization** - Indian Rupee currency formatting with locale support  
✅ **Keyboard Navigation** - Full keyboard accessibility (Enter, Space, Arrow keys, Tab)  
✅ **ARIA Support** - Screen reader friendly with proper ARIA labels and live regions  
✅ **Error Handling** - Graceful error states with retry functionality  
✅ **Mock API** - Built-in mock API service for development and testing  
✅ **Search & Filter** - Real-time search and category filtering  
✅ **Sorting** - Multiple sort options (name, price, rating, revenue)  
✅ **Unit Tests** - Comprehensive test coverage with Jest and React Testing Library  
✅ **Loading States** - Smooth loading indicators  
✅ **Empty States** - User-friendly empty and no-results states  

## Installation

### 1. Install Dependencies

```bash
npm install chart.js react-chartjs-2
npm install --save-dev typescript @types/react @types/react-dom @types/node @types/jest
```

### 2. Update Package.json

The following dependencies are required:

```json
{
  "dependencies": {
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "@mui/material": "^5.11.13",
    "@mui/icons-material": "^5.11.11"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/react": "^18.2.27",
    "@types/react-dom": "^18.2.12",
    "@types/node": "^20.8.4",
    "@types/jest": "^29.5.5"
  }
}
```

### 3. TypeScript Configuration

Create `tsconfig.json` in your project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "baseUrl": "src",
    "allowJs": true
  }
}
```

## Quick Start

### Basic Usage

```tsx
import { ProductList } from 'components/ProductList';

function App() {
  return <ProductList />;
}
```

### With Custom Props

```tsx
import { ProductList } from 'components/ProductList';
import { Product } from 'types/product.types';

function App() {
  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
  };

  return (
    <ProductList
      onProductClick={handleProductClick}
      showCharts={true}
      currency="INR"
    />
  );
}
```

### With External Data

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

function App() {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <ProductList
      products={data}
      isLoading={isLoading}
      error={error}
      showCharts={true}
    />
  );
}
```

## Props

### ProductList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | `Product[]` | `undefined` | Array of products to display. If not provided, fetches from mock API |
| `isLoading` | `boolean` | `false` | Loading state indicator |
| `error` | `Error \| null` | `null` | Error object if API call fails |
| `onProductClick` | `(product: Product) => void` | `undefined` | Callback when a product is clicked |
| `showCharts` | `boolean` | `true` | Whether to display analytics charts |
| `currency` | `'INR' \| 'USD'` | `'INR'` | Currency format for prices |

### ProductCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `product` | `Product` | required | Product data object |
| `onClick` | `(product: Product) => void` | `undefined` | Click handler |
| `currency` | `'INR' \| 'USD'` | `'INR'` | Currency format |

### ProductCharts Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | `Product[]` | required | Array of products for analytics |

## Components

### ProductList

Main container component that orchestrates the entire product listing experience.

**Features:**
- Search functionality with real-time filtering
- Category filtering
- Multi-criteria sorting
- Loading and error states
- Empty state handling
- Responsive grid layout
- Analytics charts toggle

### ProductCard

Individual product card component with expand/collapse functionality.

**Features:**
- Product information display
- Rating visualization
- Price formatting (INR/USD)
- Expandable details section
- Low stock warning
- Keyboard navigation
- ARIA labels

### ProductCharts

Data visualization component using Chart.js.

**Charts Included:**
- **Bar Chart** - Products by Category
- **Line Chart** - Top 5 Products by Revenue
- **Doughnut Chart** - Revenue Distribution by Category
- **Summary Statistics** - Key metrics display

## API Integration

### Mock API Service

The component includes a built-in mock API service for development and testing.

```typescript
import { fetchProducts } from 'services/mockProductApi';

const response = await fetchProducts();
// { data: Product[], error?: ApiError, isLoading: boolean }
```

### API Configuration

```typescript
import { setMockApiConfig } from 'services/mockProductApi';

// Configure API behavior
setMockApiConfig({
  shouldFail: false,      // Force API to fail
  failureRate: 0.1,       // 10% failure rate
  delayMs: 500,           // Simulate network delay
});
```

### Available API Methods

```typescript
// Fetch all products
fetchProducts(): Promise<ApiResponse<Product[]>>

// Fetch single product by ID
fetchProductById(id: string): Promise<ApiResponse<Product>>

// Fetch products by category
fetchProductsByCategory(category: string): Promise<ApiResponse<Product[]>>

// Get product statistics
getProductStats(products: Product[]): ProductStats
```

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between interactive elements |
| `Shift + Tab` | Navigate backwards |
| `Enter` | Activate buttons and select products |
| `Space` | Activate buttons and select products |
| `Escape` | Close expanded sections |

### ARIA Support

- **Live Regions** - Screen reader announcements for dynamic content
- **ARIA Labels** - Descriptive labels for all interactive elements
- **ARIA Expanded** - State indication for expandable sections
- **ARIA Controls** - Relationship between controls and content
- **Role Attributes** - Proper semantic roles (main, region, article, status, alert)

### Screen Reader Announcements

```typescript
import { announceToScreenReader } from 'utils/accessibility.utils';

// Polite announcement (doesn't interrupt)
announceToScreenReader('Products loaded successfully', 'polite');

// Assertive announcement (interrupts current speech)
announceToScreenReader('Error occurred', 'assertive');
```

## Theming

The component automatically adapts to Material-UI theme mode (dark/light).

### Theme Integration

```tsx
import { ThemeProvider, createTheme } from '@mui/material';
import { ProductList } from 'components/ProductList';

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'light'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProductList />
    </ThemeProvider>
  );
}
```

### Custom Colors

Charts automatically use theme colors:
- Primary color for main data series
- Secondary color for accents
- Neutral colors for text and borders

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

- ✅ **Currency Utils** - 100% coverage
- ✅ **Accessibility Utils** - 100% coverage
- ✅ **Mock API Service** - 100% coverage
- ✅ **ProductCard Component** - 95%+ coverage
- ✅ **ProductList Component** - 90%+ coverage

### Writing Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { ProductList } from 'components/ProductList';

test('should render products', () => {
  const products = [/* mock products */];
  
  render(
    <ThemeProvider theme={createTheme()}>
      <ProductList products={products} />
    </ThemeProvider>
  );
  
  expect(screen.getByText('Products')).toBeInTheDocument();
});
```

## Examples

### Example 1: Basic Product List

```tsx
import { ProductList } from 'components/ProductList';

export default function ProductsPage() {
  return <ProductList />;
}
```

### Example 2: With Product Click Handler

```tsx
import { ProductList } from 'components/ProductList';
import { Product } from 'types/product.types';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product._id}`);
  };

  return <ProductList onProductClick={handleProductClick} />;
}
```

### Example 3: With External API

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

export default function ProductsPage() {
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

### Example 4: USD Currency Format

```tsx
import { ProductList } from 'components/ProductList';

export default function InternationalProductsPage() {
  return <ProductList currency="USD" />;
}
```

### Example 5: Without Analytics Charts

```tsx
import { ProductList } from 'components/ProductList';

export default function SimpleProductsPage() {
  return <ProductList showCharts={false} />;
}
```

### Example 6: Custom Error Handling

```tsx
import { ProductList } from 'components/ProductList';
import { useState, useEffect } from 'react';
import { fetchProducts } from 'services/mockProductApi';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <ProductList
      products={products}
      isLoading={loading}
      error={error}
    />
  );
}
```

## Utility Functions

### Currency Formatting

```typescript
import { formatINR, formatUSD, convertUSDToINR } from 'utils/currency.utils';

// Format in INR
formatINR(1999); // ₹1,999.00

// Format in USD
formatUSD(1999); // $1,999.00

// Convert USD to INR
convertUSDToINR(100, 83); // 8300
```

### Accessibility Helpers

```typescript
import {
  handleKeyPress,
  createAriaLabel,
  announceToScreenReader,
} from 'utils/accessibility.utils';

// Handle keyboard events
handleKeyPress(event, {
  onEnter: () => console.log('Enter pressed'),
  onSpace: () => console.log('Space pressed'),
  onEscape: () => console.log('Escape pressed'),
});

// Create ARIA label
const label = createAriaLabel({
  name: 'Product Name',
  price: 1999,
  category: 'Electronics',
  rating: 4.5,
});

// Announce to screen reader
announceToScreenReader('Action completed', 'polite');
```

## Type Definitions

```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  supply: number;
  stat: ProductStat[];
}

interface ProductStat {
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year?: number;
}

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  isLoading: boolean;
}

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **Lazy Loading** - Charts load only when visible
- **Memoization** - Chart data calculations are memoized
- **Virtualization** - Consider implementing virtual scrolling for large datasets
- **Debouncing** - Search input is debounced to reduce re-renders

## Contributing

See main project CONTRIBUTING.md for guidelines.

## License

MIT License - See LICENSE.md for details.

## Support

For issues and questions, please refer to the main project documentation or open an issue on GitHub.
