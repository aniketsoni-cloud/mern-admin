# ProductList Component

A modular, accessible ProductList component for MERN Admin Dashboard built with TypeScript, featuring Chart.js visualizations, INR localization, keyboard/ARIA accessibility, error handling, and comprehensive unit tests.

## Features

- ✅ **TypeScript** - Fully typed with interfaces for Product, ProductStat, and component props
- ✅ **Chart.js Visualizations** - Monthly sales sparkline charts using react-chartjs-2
- ✅ **INR Localization** - Indian Rupee formatting with Intl.NumberFormat and compact notation (₹1.2L, ₹3.5Cr)
- ✅ **Accessibility** - Full ARIA labels, keyboard navigation, semantic HTML, screen reader support
- ✅ **Dark/Light Theme** - Seamlessly integrates with MUI theme system
- ✅ **Responsive Design** - Grid layout adapts from mobile to desktop
- ✅ **Error Handling** - Loading, error, and empty states with user-friendly messages
- ✅ **MSW Mock APIs** - Mock Service Worker for development and testing
- ✅ **Unit Tests** - Comprehensive test coverage with React Testing Library

## Installation

The required dependencies have been added to `package.json`. Install them with:

```bash
cd client
npm install
```

### Dependencies Added

```json
{
  "dependencies": {
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "typescript": "^4.9.5"
  },
  "devDependencies": {
    "@types/jest": "^29.5.5",
    "@types/node": "^20.8.4",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "msw": "^1.3.2"
  }
}
```

## Usage

### Basic Usage

```tsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

const ProductsPage = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  
  return (
    <ProductList 
      data={data} 
      isLoading={isLoading} 
      error={error} 
    />
  );
};
```

### With MSW Mocks (Development)

To use mock data during development, create a `.env` file in the client directory:

```env
REACT_APP_USE_MOCKS=true
```

Then start your development server:

```bash
npm start
```

The MSW service worker will intercept API calls and return mock product data.

## Component Structure

```
ProductList/
├── ProductCard.tsx       # Individual product card with chart
├── ProductList.tsx       # Container component with grid layout
├── ProductList.test.tsx  # Unit tests
├── index.ts             # Barrel exports
└── README.md            # This file
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
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
}
```

## Utility Functions

### `formatINR(amount: number): string`

Formats a number as Indian Rupee currency.

```typescript
formatINR(1000) // "₹1,000.00"
formatINR(2500.50) // "₹2,500.50"
```

### `formatINRCompact(amount: number): string`

Formats a number as compact Indian Rupee notation.

```typescript
formatINRCompact(50000) // "₹0.50L"
formatINRCompact(150000) // "₹1.50L"
formatINRCompact(12500000) // "₹1.25Cr"
```

## Accessibility Features

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full keyboard support for expand/collapse
- **Screen Reader Support**: Status updates announced via `aria-live`
- **Semantic HTML**: Proper use of `<article>`, `<list>`, `<listitem>`
- **Focus Management**: Logical tab order and visible focus indicators
- **Color Contrast**: Meets WCAG AA standards in both themes

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Generate coverage report:

```bash
npm test -- --coverage
```

### Test Coverage

- ✅ Loading state with spinner
- ✅ Error state with error message
- ✅ Empty state with info message
- ✅ Success state with product grid
- ✅ INR price formatting
- ✅ Chart rendering
- ✅ Expand/collapse functionality
- ✅ ARIA attributes and accessibility
- ✅ Dark/light theme rendering
- ✅ Responsive design

## Chart Configuration

The sparkline charts are configured to:
- Show monthly sales trends
- Display tooltips with INR formatted values
- Hide axes for clean sparkline appearance
- Use theme colors for consistency
- Smooth line curves with tension: 0.4

## Responsive Breakpoints

- **Desktop (≥1000px)**: 4 columns
- **Tablet (<1000px)**: 1 column (full width)
- **Mobile**: 1 column (full width)

## Theme Integration

The component automatically adapts to the MUI theme:
- Uses `theme.palette.background.alt` for card backgrounds
- Uses `theme.palette.secondary` for accents and charts
- Respects dark/light mode from Redux global state

## Error Handling

The component handles three states:
1. **Loading**: Shows centered spinner with ARIA status
2. **Error**: Displays error alert with message
3. **Empty**: Shows info alert when no products exist

## Future Enhancements

Potential improvements:
- [ ] Pagination for large product lists
- [ ] Search and filter functionality
- [ ] Sort by price, rating, or name
- [ ] Product detail modal
- [ ] Add to cart functionality
- [ ] Wishlist integration
- [ ] Export to CSV/PDF

## License

MIT - Part of MERN Admin Dashboard

## Author

Built for modern admin dashboards with best practices in accessibility and TypeScript.
