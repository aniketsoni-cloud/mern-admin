import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductCard from '../ProductCard';
import { Product, ProductStat } from 'types/product.types';

const theme = createTheme();

const mockProduct: Product & { stat: ProductStat } = {
  _id: '1',
  name: 'Test Product',
  price: 150,
  description: 'A product for testing',
  category: 'Testing',
  rating: 5,
  supply: 50,
  yearlySalesTotal: 7500,
  yearlyTotalSoldUnits: 50,
  stat: {
    productId: '1',
    yearlySalesTotal: 7500,
    yearlyTotalSoldUnits: 50,
    monthlyData: [],
    dailyData: [],
  },
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductCard product={mockProduct} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A product for testing')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText(/₹150.00/)).toBeInTheDocument();
  });
});
