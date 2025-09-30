# ProductList Component - Installation Checklist

Use this checklist to verify successful installation and setup.

## ✅ Pre-Installation

- [ ] Node.js and npm are installed
- [ ] Project is cloned/accessible
- [ ] Current directory is `client` folder

## 📦 Step 1: Install Dependencies

```bash
cd client
npm install
```

**Verify these packages are installed:**
- [ ] chart.js: ^4.4.0
- [ ] react-chartjs-2: ^5.2.0
- [ ] typescript: ^5.2.2
- [ ] @types/react: ^18.2.27
- [ ] @types/react-dom: ^18.2.12
- [ ] @types/node: ^20.8.4
- [ ] @types/jest: ^29.5.5

Check by running: `npm list chart.js react-chartjs-2 typescript`

## 📁 Step 2: Verify Files Exist

### Core Components
- [ ] `src/components/ProductList/ProductList.tsx`
- [ ] `src/components/ProductList/ProductCard.tsx`
- [ ] `src/components/ProductList/ProductCharts.tsx`
- [ ] `src/components/ProductList/index.ts`

### Type Definitions
- [ ] `src/types/product.types.ts`

### Utilities
- [ ] `src/utils/currency.utils.ts`
- [ ] `src/utils/accessibility.utils.ts`

### Services
- [ ] `src/services/mockProductApi.ts`

### Tests
- [ ] `src/utils/__tests__/currency.utils.test.ts`
- [ ] `src/utils/__tests__/accessibility.utils.test.ts`
- [ ] `src/services/__tests__/mockProductApi.test.ts`
- [ ] `src/components/ProductList/__tests__/ProductCard.test.tsx`
- [ ] `src/components/ProductList/__tests__/ProductList.test.tsx`

### Documentation
- [ ] `src/components/ProductList/README.md`
- [ ] `src/components/ProductList/INTEGRATION_GUIDE.md`
- [ ] `src/components/ProductList/EXAMPLES.md`

### Demo & Config
- [ ] `src/scenes/productsNew/index.tsx`
- [ ] `tsconfig.json`
- [ ] `PRODUCTLIST_SETUP.md`

## 🧪 Step 3: Run Tests

```bash
npm test
```

**Tests should pass:**
- [ ] Currency utils tests (8/8 passing)
- [ ] Accessibility utils tests (12/12 passing)
- [ ] Mock API tests (15/15 passing)
- [ ] ProductCard tests (12/12 passing)
- [ ] ProductList tests (18/18 passing)

**Total: 65+ tests should pass**

If tests fail with module errors, run: `npm install` again

## 🎨 Step 4: Verify TypeScript Configuration

Check `tsconfig.json` exists and contains:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "baseUrl": "src",
    "allowJs": true
  }
}
```

- [ ] TypeScript config is correct
- [ ] No TypeScript compilation errors

## 🚀 Step 5: Test Component in Development

### Option A: Add to Existing Route

Edit `src/scenes/products/index.jsx`:

```jsx
import { ProductList } from 'components/ProductList';
import { useGetProductsQuery } from 'state/api';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  return <ProductList products={data} isLoading={isLoading} />;
};
```

### Option B: Add New Route

1. Edit `src/App.js`:
```jsx
import { ProductsNew } from "scenes";
// Add route:
<Route path="/products-new" element={<ProductsNew />} />
```

2. Start dev server:
```bash
npm start
```

3. Navigate to: `http://localhost:3000/products-new`

**Verify:**
- [ ] Page loads without errors
- [ ] Products display in grid
- [ ] Search works
- [ ] Filters work
- [ ] Charts display
- [ ] Theme toggle works (dark/light)

## 🎯 Step 6: Feature Testing

### Search & Filter
- [ ] Type in search box → products filter
- [ ] Click "Filters" button → panel expands
- [ ] Select category → products filter
- [ ] Change sort order → products reorder
- [ ] Click "Clear Filters" → resets all

### Product Cards
- [ ] Products display in grid
- [ ] Prices show in INR (₹)
- [ ] Ratings display correctly
- [ ] Click "See More" → details expand
- [ ] Click "See Less" → details collapse
- [ ] Low stock warning shows when supply < 50

### Charts
- [ ] Bar chart displays (Products by Category)
- [ ] Line chart displays (Top 5 Products)
- [ ] Doughnut chart displays (Revenue Distribution)
- [ ] Summary statistics show
- [ ] Toggle "Show Analytics Charts" → charts hide/show
- [ ] Tooltips show formatted values

### Responsive Design
- [ ] Mobile view (< 768px): 1 column
- [ ] Tablet view (768-1024px): 2 columns
- [ ] Desktop view (> 1024px): 4 columns
- [ ] All elements responsive

### Theme
- [ ] Component displays in current theme
- [ ] Toggle theme → colors update
- [ ] Charts adapt to theme
- [ ] Text readable in both modes

### Loading State
- [ ] Shows spinner when loading
- [ ] "Loading..." message appears
- [ ] Spinner disappears when loaded

### Error State
- [ ] Error message displays
- [ ] "Retry" button appears
- [ ] Clicking retry reloads data

## ⌨️ Step 7: Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter activates buttons
- [ ] Space activates buttons
- [ ] Escape closes expanded sections
- [ ] Focus visible on all elements

### Screen Reader
- [ ] Turn on screen reader (NVDA/JAWS/VoiceOver)
- [ ] Product cards announce correctly
- [ ] Button labels are clear
- [ ] Dynamic updates announced
- [ ] Form controls labeled

### ARIA
- [ ] Inspect elements for aria-label
- [ ] Check aria-live regions exist
- [ ] Verify aria-expanded on buttons
- [ ] Confirm role attributes present

## 🔍 Step 8: Browser Testing

Test in multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 🐛 Step 9: Troubleshooting

### If tests fail:
```bash
npm install
npm test
```

### If TypeScript errors:
```bash
# Check tsconfig.json exists
cat tsconfig.json

# Restart IDE/Editor
```

### If component not rendering:
```bash
# Check imports
# Verify file paths
# Check browser console for errors
```

### If charts not showing:
```bash
# Verify chart.js installed
npm list chart.js

# Check browser console
# Ensure showCharts prop is true
```

### If theme not working:
- Verify ThemeProvider wraps component
- Check Material-UI theme is configured
- Verify theme mode in Redux state

## 📊 Step 10: Performance Check

- [ ] Page loads in < 2 seconds
- [ ] Search is responsive (< 100ms)
- [ ] Sorting is instant
- [ ] Charts render smoothly
- [ ] No console warnings/errors

## ✨ Step 11: Final Verification

### Code Quality
- [ ] No lint errors
- [ ] No TypeScript errors
- [ ] All imports resolve
- [ ] No unused variables

### Functionality
- [ ] All features work as expected
- [ ] No runtime errors
- [ ] Data displays correctly
- [ ] Interactions smooth

### Documentation
- [ ] README.md readable
- [ ] Examples work
- [ ] Integration guide clear
- [ ] Comments in code

## 🎉 Installation Complete!

If all items are checked, the component is successfully installed and ready for use.

## 📝 Post-Installation

### Recommended Next Steps:
1. [ ] Customize styling to match your brand
2. [ ] Connect to your backend API
3. [ ] Add custom product fields if needed
4. [ ] Update Sidebar navigation
5. [ ] Train team on new features
6. [ ] Monitor in production

### Optional Enhancements:
- [ ] Add pagination for large datasets
- [ ] Implement product comparison
- [ ] Add export functionality
- [ ] Create product detail page
- [ ] Add favorites/wishlist
- [ ] Implement bulk actions

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**
   - README.md
   - INTEGRATION_GUIDE.md
   - EXAMPLES.md

2. **Review Console**
   - Browser console for errors
   - Terminal for build errors

3. **Verify Setup**
   - Run through checklist again
   - Check all dependencies installed
   - Verify file structure

4. **Test in Isolation**
   - Test component alone
   - Check mock API works
   - Verify utilities work

## 📞 Support Resources

- Component README: `src/components/ProductList/README.md`
- Integration Guide: `src/components/ProductList/INTEGRATION_GUIDE.md`
- Code Examples: `src/components/ProductList/EXAMPLES.md`
- Setup Guide: `PRODUCTLIST_SETUP.md`
- Summary: `PRODUCTLIST_SUMMARY.md`

---

**✅ Checklist Complete = Component Ready for Production!**
