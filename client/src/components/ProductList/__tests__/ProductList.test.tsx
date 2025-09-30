/**
 * ProductList Component Unit Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import '@testing-library/jest-dom';
import { ProductList } from '../ProductList';
import { Product } from '../../../types/product.types';
import * as mockApi from '../../../services/mockProductApi';

// Mock the API
jest.mock('../../../services/mockProductApi');

const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones',
    price: 8999,
    rating: 4.5,
    category: 'Electronics',
    supply: 150,
    stat: [{ yearlySalesTotal: 1349850, yearlyTotalSoldUnits: 150 }],
  },
  {
    _id: '2',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum stand',
    price: 2499,
    rating: 4.2,
    category: 'Accessories',
    supply: 300,
    stat: [{ yearlySalesTotal: 749700, yearlyTotalSoldUnits: 300 }],
  },
  {
    _id: '3',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit keyboard',
    price: 6999,
    rating: 4.6,
    category: 'Electronics',
    supply: 180,
    stat: [{ yearlySalesTotal: 1259820, yearlyTotalSoldUnits: 180 }],
  },
];

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering with props', () => {
    it('should render products passed via props', () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
      expect(screen.getByText('Laptop Stand')).toBeInTheDocument();
      expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
    });

    it('should display product count', () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      expect(screen.getByText(/Showing 3 of 3 products/)).toBeInTheDocument();
    });

    it('should display loading state', () => {
      renderWithTheme(<ProductList isLoading={true} />);

      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });

    it('should display error state', () => {
      const error = new Error('Failed to load products');
      renderWithTheme(<ProductList error={error} isLoading={false} />);

      expect(screen.getByText('Error Loading Products')).toBeInTheDocument();
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    it('should fetch products from API when not provided via props', async () => {
      (mockApi.fetchProducts as jest.Mock).mockResolvedValue({
        data: mockProducts,
        error: undefined,
        isLoading: false,
      });

      renderWithTheme(<ProductList />);

      await waitFor(() => {
        expect(mockApi.fetchProducts).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
      });
    });

    it('should handle API errors', async () => {
      (mockApi.fetchProducts as jest.Mock).mockResolvedValue({
        data: undefined,
        error: { message: 'Network error', code: 'NETWORK_ERROR' },
        isLoading: false,
      });

      renderWithTheme(<ProductList />);

      await waitFor(() => {
        expect(screen.getByText('Error Loading Products')).toBeInTheDocument();
      });
    });

    it('should retry on error button click', async () => {
      (mockApi.fetchProducts as jest.Mock).mockResolvedValue({
        data: undefined,
        error: { message: 'Network error', code: 'NETWORK_ERROR' },
        isLoading: false,
      });

      renderWithTheme(<ProductList />);

      await waitFor(() => {
        expect(screen.getByText('Error Loading Products')).toBeInTheDocument();
      });

      const retryButton = screen.getByText('Retry');
      fireEvent.click(retryButton);

      expect(mockApi.fetchProducts).toHaveBeenCalledTimes(2);
    });
  });

  describe('Search Functionality', () => {
    it('should filter products by search term', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'Wireless' } });

      await waitFor(() => {
        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
        expect(screen.queryByText('Laptop Stand')).not.toBeInTheDocument();
      });
    });

    it('should be case-insensitive', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'wireless' } });

      await waitFor(() => {
        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
      });
    });

    it('should search in description', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'ergonomic' } });

      await waitFor(() => {
        expect(screen.getByText('Laptop Stand')).toBeInTheDocument();
        expect(screen.queryByText('Wireless Headphones')).not.toBeInTheDocument();
      });
    });

    it('should clear search when clear button is clicked', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'Wireless' } });

      const clearButton = screen.getByLabelText('Clear search');
      fireEvent.click(clearButton);

      expect(searchInput).toHaveValue('');
    });

    it('should show empty state when no results found', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'NonExistent' } });

      await waitFor(() => {
        expect(screen.getByText('No Products Found')).toBeInTheDocument();
      });
    });
  });

  describe('Filter Functionality', () => {
    it('should toggle filter panel', () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const filterButton = screen.getByText('Filters');
      fireEvent.click(filterButton);

      expect(screen.getByLabelText('Filter by category')).toBeInTheDocument();
    });

    it('should filter by category', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      // Open filters
      fireEvent.click(screen.getByText('Filters'));

      // Select category
      const categorySelect = screen.getByLabelText('Filter by category');
      fireEvent.mouseDown(categorySelect);

      const electronicsOption = await screen.findByText('Electronics');
      fireEvent.click(electronicsOption);

      await waitFor(() => {
        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
        expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
        expect(screen.queryByText('Laptop Stand')).not.toBeInTheDocument();
      });
    });

    it('should clear filters when clear filters button is clicked', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      // Set a filter
      fireEvent.click(screen.getByText('Filters'));
      const categorySelect = screen.getByLabelText('Filter by category');
      fireEvent.mouseDown(categorySelect);
      const electronicsOption = await screen.findByText('Electronics');
      fireEvent.click(electronicsOption);

      // Search for non-existent product
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'Stand' } });

      await waitFor(() => {
        expect(screen.getByText('No Products Found')).toBeInTheDocument();
      });

      // Clear filters
      const clearButton = screen.getByText('Clear Filters');
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(searchInput).toHaveValue('');
      });
    });
  });

  describe('Sort Functionality', () => {
    it('should sort products by name', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      fireEvent.click(screen.getByText('Filters'));

      const sortSelect = screen.getByLabelText('Sort products by');
      fireEvent.mouseDown(sortSelect);

      const nameOption = await screen.findByText('Name (A-Z)');
      fireEvent.click(nameOption);

      // Products should be in alphabetical order
      const productCards = screen.getAllByRole('article');
      expect(productCards[0]).toHaveTextContent('Laptop Stand');
      expect(productCards[1]).toHaveTextContent('Mechanical Keyboard');
      expect(productCards[2]).toHaveTextContent('Wireless Headphones');
    });
  });

  describe('Charts Display', () => {
    it('should show charts by default when showCharts is true', () => {
      renderWithTheme(
        <ProductList
          products={mockProducts}
          isLoading={false}
          error={null}
          showCharts={true}
        />
      );

      expect(screen.getByText('Product Analytics')).toBeInTheDocument();
    });

    it('should hide charts when showCharts is false', () => {
      renderWithTheme(
        <ProductList
          products={mockProducts}
          isLoading={false}
          error={null}
          showCharts={false}
        />
      );

      expect(screen.queryByText('Product Analytics')).not.toBeInTheDocument();
    });

    it('should toggle charts with switch', async () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      fireEvent.click(screen.getByText('Filters'));

      const chartsSwitch = screen.getByLabelText('Toggle analytics charts');
      
      // Charts should be visible initially
      expect(screen.getByText('Product Analytics')).toBeInTheDocument();

      // Toggle off
      fireEvent.click(chartsSwitch);

      await waitFor(() => {
        expect(screen.queryByText('Product Analytics')).not.toBeInTheDocument();
      });

      // Toggle on
      fireEvent.click(chartsSwitch);

      await waitFor(() => {
        expect(screen.getByText('Product Analytics')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      expect(screen.getByRole('main')).toHaveAttribute('aria-label', 'Product List');
      expect(screen.getByPlaceholderText('Search products...')).toHaveAttribute(
        'aria-label',
        'Search products'
      );
    });

    it('should announce loading state to screen readers', () => {
      renderWithTheme(<ProductList isLoading={true} />);

      const loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('aria-label', 'Loading products');
    });

    it('should announce errors to screen readers', () => {
      const error = new Error('Failed to load');
      renderWithTheme(<ProductList error={error} isLoading={false} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should have proper role for results count', () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      const resultsCount = screen.getByText(/Showing 3 of 3 products/);
      expect(resultsCount).toHaveAttribute('role', 'status');
    });
  });

  describe('Product Click Handler', () => {
    it('should call onProductClick when product is clicked', () => {
      const handleClick = jest.fn();
      renderWithTheme(
        <ProductList
          products={mockProducts}
          isLoading={false}
          error={null}
          onProductClick={handleClick}
        />
      );

      const productCard = screen.getByText('Wireless Headphones').closest('[role="article"]');
      if (productCard) {
        fireEvent.click(productCard);
      }

      expect(handleClick).toHaveBeenCalledWith(mockProducts[0]);
    });
  });

  describe('Responsive Behavior', () => {
    it('should render on mobile viewport', () => {
      renderWithTheme(
        <ProductList products={mockProducts} isLoading={false} error={null} />
      );

      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getAllByRole('article')).toHaveLength(3);
    });
  });

  describe('Refresh Functionality', () => {
    it('should refresh products when refresh button is clicked', async () => {
      (mockApi.fetchProducts as jest.Mock).mockResolvedValue({
        data: mockProducts,
        error: undefined,
        isLoading: false,
      });

      renderWithTheme(<ProductList />);

      await waitFor(() => {
        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
      });

      const refreshButton = screen.getByLabelText('Refresh product list');
      fireEvent.click(refreshButton);

      expect(mockApi.fetchProducts).toHaveBeenCalledTimes(2);
    });
  });
});
