# ProductList Component - Quick Setup Guide

Complete setup guide for the modular, accessible ProductList component with TypeScript, Chart.js visualizations, INR localization, and full accessibility support.

## 📋 What's Included

✅ **TypeScript Support** - Fully typed component with comprehensive type definitions  
✅ **Chart.js Visualizations** - Bar, Line, and Doughnut charts for product analytics  
✅ **INR Localization** - Indian Rupee currency formatting  
✅ **Keyboard & ARIA Accessibility** - Full keyboard navigation and screen reader support  
✅ **Dark/Light Themes** - Automatic theme adaptation  
✅ **Error Handling** - Graceful error states with retry functionality  
✅ **Mock API** - Built-in mock service for development  
✅ **Unit Tests** - Comprehensive test coverage  
✅ **Search & Filter** - Real-time search and category filtering  
✅ **Responsive Design** - Mobile-first approach  

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd client
npm install chart.js react-chartjs-2
npm install --save-dev typescript @types/react @types/react-dom @types/node @types/jest
```

### Step 2: Verify Files

All necessary files have been created in your project:

**Components:**
- `src/components/ProductList/ProductList.tsx` - Main component
- `src/components/ProductList/ProductCard.tsx` - Individual product card
- `src/components/ProductList/ProductCharts.tsx` - Chart visualizations
- `src/components/ProductList/index.ts` - Component exports

**Types:**
- `src/types/product.types.ts` - TypeScript type definitions

**Utilities:**
- `src/utils/currency.utils.ts` - Currency formatting utilities
- `src/utils/accessibility.utils.ts` - Accessibility helpers

**Services:**
- `src/services/mockProductApi.ts` - Mock API service

**Tests:**
- `src/utils/__tests__/currency.utils.test.ts`
- `src/utils/__tests__/accessibility.utils.test.ts`
- `src/services/__tests__/mockProductApi.test.ts`
- `src/components/ProductList/__tests__/ProductCard.test.tsx`
- `src/components/ProductList/__tests__/ProductList.test.tsx`

**Documentation:**
- `src/components/ProductList/README.md` - Component documentation
- `src/components/ProductList/INTEGRATION_GUIDE.md` - Integration guide
- `src/components/ProductList/EXAMPLES.md` - Code examples

**Demo:**
- `src/scenes/productsNew/index.tsx` - Example implementation

**Configuration:**
- `client/tsconfig.json` - TypeScript configuration

### Step 3: Basic Usage

The simplest way to use the component:

```tsx
import { ProductList } from 'components/ProductList';

export default function ProductsPage() {
  return <ProductList />;
}
```

### Step 4: Integration with Existing API

Replace the existing products page:

```tsx
// src/scenes/products/index.jsx (or .tsx)
import React from 'react';
import { Box } from '@mui/material';
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';
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

### Step 5: Add New Route (Optional)

To keep both old and new versions, add a route in `src/App.js`:

```jsx
import { ProductsNew } from "scenes";

// Inside Routes
<Route path="/products-new" element={<ProductsNew />} />
```

## 📦 File Structure

```
client/
├── src/
│   ├── components/
│   │   └── ProductList/
│   │       ├── ProductList.tsx          # Main component
│   │       ├── ProductCard.tsx          # Product card component
│   │       ├── ProductCharts.tsx        # Charts component
│   │       ├── index.ts                 # Exports
│   │       ├── README.md                # Documentation
│   │       ├── INTEGRATION_GUIDE.md     # Integration guide
│   │       ├── EXAMPLES.md              # Code examples
│   │       └── __tests__/               # Unit tests
│   │           ├── ProductList.test.tsx
│   │           └── ProductCard.test.tsx
│   ├── types/
│   │   └── product.types.ts             # Type definitions
│   ├── utils/
│   │   ├── currency.utils.ts            # Currency utilities
│   │   ├── accessibility.utils.ts       # Accessibility helpers
│   │   └── __tests__/                   # Utility tests
│   ├── services/
│   │   ├── mockProductApi.ts            # Mock API service
│   │   └── __tests__/                   # Service tests
│   └── scenes/
│       └── productsNew/
│           └── index.tsx                # Demo implementation
├── tsconfig.json                        # TypeScript config
└── package.json                         # Updated dependencies
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test ProductList.test.tsx
```

## 🎨 Component Props

### ProductList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | `Product[]` | `undefined` | Array of products (uses mock API if not provided) |
| `isLoading` | `boolean` | `false` | Loading state |
| `error` | `Error \| null` | `null` | Error object |
| `onProductClick` | `(product: Product) => void` | `undefined` | Click handler |
| `showCharts` | `boolean` | `true` | Show analytics charts |
| `currency` | `'INR' \| 'USD'` | `'INR'` | Currency format |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between elements |
| `Shift + Tab` | Navigate backwards |
| `Enter` | Activate/Select |
| `Space` | Activate/Select |
| `Escape` | Close expanded sections |

## 🎯 Features Overview

### 1. Search & Filter
- Real-time product search
- Category filtering
- Multiple sort options (name, price, rating, revenue)

### 2. Visualizations
- Products by Category (Bar Chart)
- Top 5 Products by Revenue (Line Chart)
- Revenue Distribution (Doughnut Chart)
- Summary Statistics

### 3. Accessibility
- ARIA labels and live regions
- Keyboard navigation
- Screen reader announcements
- Focus management

### 4. Responsive Design
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

### 5. Theme Support
- Automatic dark/light mode
- Uses Material-UI theme colors

## 🔧 Configuration

### Mock API Configuration

```typescript
import { setMockApiConfig } from 'services/mockProductApi';

setMockApiConfig({
  shouldFail: false,      // Simulate API failures
  failureRate: 0.1,       // 10% failure rate
  delayMs: 500,           // Network delay simulation
});
```

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

## 📚 Documentation

- **[README.md](src/components/ProductList/README.md)** - Complete component documentation
- **[INTEGRATION_GUIDE.md](src/components/ProductList/INTEGRATION_GUIDE.md)** - Integration instructions
- **[EXAMPLES.md](src/components/ProductList/EXAMPLES.md)** - Code examples

## 🐛 Troubleshooting

### TypeScript Errors

If you see TypeScript errors, ensure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": "src",
    "allowJs": true
  }
}
```

### Chart.js Not Rendering

Ensure Chart.js components are registered (already done in ProductCharts.tsx):

```typescript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  // ... other components
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, /* ... */);
```

### Module Not Found

If you see module errors, run:

```bash
npm install
```

## 🚢 Deployment Checklist

- [ ] Install all dependencies
- [ ] Run tests (`npm test`)
- [ ] Test in development (`npm start`)
- [ ] Test dark/light theme toggle
- [ ] Test responsive design on mobile
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Build for production (`npm run build`)
- [ ] Deploy

## 📈 Next Steps

1. **Customize** - Adjust styling to match your brand
2. **Extend** - Add features like bulk actions, export, etc.
3. **Optimize** - Implement pagination for large datasets
4. **Monitor** - Add analytics tracking
5. **Document** - Update project docs

## 💡 Usage Examples

### Basic Example
```tsx
<ProductList />
```

### With API Integration
```tsx
<ProductList
  products={data}
  isLoading={isLoading}
  currency="INR"
/>
```

### With Click Handler
```tsx
<ProductList
  onProductClick={(product) => navigate(`/products/${product._id}`)}
/>
```

### Without Charts
```tsx
<ProductList showCharts={false} />
```

## 🤝 Support

For detailed examples and advanced usage, see:
- [README.md](src/components/ProductList/README.md)
- [INTEGRATION_GUIDE.md](src/components/ProductList/INTEGRATION_GUIDE.md)
- [EXAMPLES.md](src/components/ProductList/EXAMPLES.md)

## 📝 License

MIT License - See project LICENSE.md

---

**Component is ready to use!** Start with the basic example and customize as needed. 🎉
