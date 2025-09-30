import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import ProductList from './ProductList';
import { Product } from 'types/product.types';
import { themeSettings } from 'theme';

// Mock Chart.js
jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Tooltip: jest.fn(),
  register: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="chart">Chart</div>,
}));

const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Test Product 1',
    description: 'Test description 1',
    price: 1000,
    rating: 4.5,
    category: 'Electronics',
    supply: 100,
    stat: [
      {
        _id: 'stat1',
        productId: '1',
        yearlySalesTotal: 50000,
        yearlyTotalSoldUnits: 50,
        year: 2023,
        monthlyData: [
          { month: 'January', totalSales: 10000, totalUnits: 10 },
          { month: 'February', totalSales: 15000, totalUnits: 15 },
        ],
        dailyData: [],
      },
    ],
  },
  {
    _id: '2',
    name: 'Test Product 2',
    description: 'Test description 2',
    price: 2500,
    rating: 4.0,
    category: 'Accessories',
    supply: 200,
    stat: [
      {
        _id: 'stat2',
        productId: '2',
        yearlySalesTotal: 75000,
        yearlyTotalSoldUnits: 30,
        year: 2023,
        monthlyData: [
          { month: 'January', totalSales: 20000, totalUnits: 8 },
          { month: 'February', totalSales: 25000, totalUnits: 10 },
        ],
        dailyData: [],
      },
    ],
  },
];

const renderWithTheme = (component: React.ReactElement, mode: 'light' | 'dark' = 'dark') => {
  const theme = createTheme(themeSettings(mode));
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ProductList Component', () => {
  describe('Loading State', () => {
    it('should display loading spinner when isLoading is true', () => {
      renderWithTheme(<ProductList data={undefined} isLoading={true} />);

      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading products');
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error is provided', () => {
      const mockError = new Error('Network error occurred');
      renderWithTheme(<ProductList data={undefined} isLoading={false} error={mockError} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();
      expect(screen.getByText('Network error occurred')).toBeInTheDocument();
    });

    it('should display generic error message when error has no message', () => {
      const mockError = new Error();
      renderWithTheme(<ProductList data={undefined} isLoading={false} error={mockError} />);

      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display empty message when data is empty array', () => {
      renderWithTheme(<ProductList data={[]} isLoading={false} />);

      expect(screen.getByText('No products found')).toBeInTheDocument();
      expect(
        screen.getByText('There are no products to display at this time.')
      ).toBeInTheDocument();
    });

    it('should display empty message when data is undefined', () => {
      renderWithTheme(<ProductList data={undefined} isLoading={false} />);

      expect(screen.getByText('No products found')).toBeInTheDocument();
    });
  });

  describe('Success State - Product Display', () => {
    it('should render all products in grid layout', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('should display INR formatted prices', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      // INR format: ₹1,000.00
      expect(screen.getByText('₹1,000.00')).toBeInTheDocument();
      expect(screen.getByText('₹2,500.00')).toBeInTheDocument();
    });

    it('should display product ratings', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const ratings = screen.getAllByLabelText(/Rating:/);
      expect(ratings).toHaveLength(2);
      expect(ratings[0]).toHaveAttribute('aria-label', 'Rating: 4.5 out of 5 stars');
      expect(ratings[1]).toHaveAttribute('aria-label', 'Rating: 4 out of 5 stars');
    });

    it('should render charts for products with monthly data', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const charts = screen.getAllByTestId('chart');
      expect(charts).toHaveLength(2);
    });
  });

  describe('Expandable Details', () => {
    it('should expand and show additional details when "See More" is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const seeMoreButtons = screen.getAllByText('See More');
      expect(seeMoreButtons).toHaveLength(2);

      // Click first "See More" button
      await user.click(seeMoreButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/ID:/)).toBeInTheDocument();
        expect(screen.getByText(/Supply Left:/)).toBeInTheDocument();
        expect(screen.getByText(/Yearly Sales:/)).toBeInTheDocument();
        expect(screen.getByText(/Yearly Units Sold:/)).toBeInTheDocument();
      });

      // Button text should change to "See Less"
      expect(screen.getByText('See Less')).toBeInTheDocument();
    });

    it('should collapse details when "See Less" is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const seeMoreButton = screen.getAllByText('See More')[0];

      // Expand
      await user.click(seeMoreButton);
      await waitFor(() => {
        expect(screen.getByText('See Less')).toBeInTheDocument();
      });

      // Collapse
      const seeLessButton = screen.getByText('See Less');
      await user.click(seeLessButton);

      await waitFor(() => {
        expect(screen.queryByText(/ID:/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for product cards', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      expect(screen.getByLabelText('Product: Test Product 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Product: Test Product 2')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for expandable sections', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const seeMoreButtons = screen.getAllByText('See More');
      seeMoreButtons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-controls');
      });
    });

    it('should have proper list semantics', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const list = screen.getByRole('list', { name: 'Products list' });
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });
  });

  describe('Theme Support', () => {
    it('should render correctly in dark mode', () => {
      const { container } = renderWithTheme(
        <ProductList data={mockProducts} isLoading={false} />,
        'dark'
      );
      expect(container).toBeInTheDocument();
    });

    it('should render correctly in light mode', () => {
      const { container } = renderWithTheme(
        <ProductList data={mockProducts} isLoading={false} />,
        'light'
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should apply responsive grid styles based on screen size', () => {
      renderWithTheme(<ProductList data={mockProducts} isLoading={false} />);

      const grid = screen.getByRole('list');
      expect(grid).toHaveStyle({
        display: 'grid',
      });
    });
  });
});
