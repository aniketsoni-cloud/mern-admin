import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductList from '../ProductList';
import * as mockApi from 'api/mockProducts';
import { Product, ProductStat } from 'types/product.types';

const theme = createTheme();

const mockProducts: Product[] = [
  { _id: '1', name: 'Product 1', price: 100, description: 'Desc 1', category: 'Cat A', rating: 4, supply: 10, yearlySalesTotal: 1000, yearlyTotalSoldUnits: 10 },
];

const mockStats: ProductStat[] = [
  { productId: '1', yearlySalesTotal: 1000, yearlyTotalSoldUnits: 10, monthlyData: [], dailyData: [] },
];

jest.mock('api/mockProducts');

describe('ProductList', () => {
  it('fetches and displays products', async () => {
    (mockApi.getMockProducts as jest.Mock).mockResolvedValue({ data: mockProducts });
    (mockApi.getMockProductStats as jest.Mock).mockResolvedValue({ data: mockStats });

    render(
      <ThemeProvider theme={theme}>
        <ProductList />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
