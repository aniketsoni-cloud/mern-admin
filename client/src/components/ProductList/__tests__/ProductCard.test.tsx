/**
 * ProductCard Component Unit Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import '@testing-library/jest-dom';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types/product.types';

const mockProduct: Product = {
  _id: '1',
  name: 'Test Product',
  description: 'This is a test product description',
  price: 1999,
  rating: 4.5,
  category: 'Electronics',
  supply: 100,
  stat: [
    {
      yearlySalesTotal: 199900,
      yearlyTotalSoldUnits: 100,
    },
  ],
};

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('should render price in INR format by default', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    const priceElement = screen.getByText(/₹/);
    expect(priceElement).toBeInTheDocument();
  });

  it('should render price in USD format when specified', () => {
    renderWithTheme(<ProductCard product={mockProduct} currency="USD" />);

    const priceElement = screen.getByText(/\$/);
    expect(priceElement).toBeInTheDocument();
  });

  it('should render rating correctly', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    expect(screen.getByText('(4.5)')).toBeInTheDocument();
  });

  it('should expand and collapse details on button click', async () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    const expandButton = screen.getByText('See More');
    expect(expandButton).toBeInTheDocument();

    // Click to expand
    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(screen.getByText('Product ID')).toBeInTheDocument();
      expect(screen.getByText('100 units')).toBeInTheDocument();
      expect(screen.getByText('See Less')).toBeInTheDocument();
    });

    // Click to collapse
    const collapseButton = screen.getByText('See Less');
    fireEvent.click(collapseButton);

    await waitFor(() => {
      expect(screen.queryByText('Product ID')).not.toBeInTheDocument();
      expect(screen.getByText('See More')).toBeInTheDocument();
    });
  });

  it('should display low stock warning when supply is low', async () => {
    const lowStockProduct = { ...mockProduct, supply: 30 };
    renderWithTheme(<ProductCard product={lowStockProduct} />);

    // Expand to see details
    fireEvent.click(screen.getByText('See More'));

    await waitFor(() => {
      expect(screen.getByText('Low Stock')).toBeInTheDocument();
    });
  });

  it('should not display low stock warning when supply is sufficient', async () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    // Expand to see details
    fireEvent.click(screen.getByText('See More'));

    await waitFor(() => {
      expect(screen.queryByText('Low Stock')).not.toBeInTheDocument();
    });
  });

  it('should call onClick when card is clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<ProductCard product={mockProduct} onClick={handleClick} />);

    const card = screen.getByRole('article');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledWith(mockProduct);
  });

  it('should handle keyboard navigation with Enter key', () => {
    const handleClick = jest.fn();
    renderWithTheme(<ProductCard product={mockProduct} onClick={handleClick} />);

    const card = screen.getByRole('article');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledWith(mockProduct);
  });

  it('should handle keyboard navigation with Space key', () => {
    const handleClick = jest.fn();
    renderWithTheme(<ProductCard product={mockProduct} onClick={handleClick} />);

    const card = screen.getByRole('article');
    fireEvent.keyDown(card, { key: ' ' });

    expect(handleClick).toHaveBeenCalledWith(mockProduct);
  });

  it('should have proper ARIA attributes', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('id', 'product-card-1');
  });

  it('should have proper ARIA attributes for expand button', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    const expandButton = screen.getByText('See More');
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    expect(expandButton).toHaveAttribute('aria-controls', 'product-details-1');
  });

  it('should update aria-expanded when expanded', async () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    const expandButton = screen.getByText('See More');
    fireEvent.click(expandButton);

    await waitFor(() => {
      const collapseButton = screen.getByText('See Less');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('should display yearly sales information when expanded', async () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByText('See More'));

    await waitFor(() => {
      expect(screen.getByText('Yearly Sales')).toBeInTheDocument();
      expect(screen.getByText(/₹1,99,900/)).toBeInTheDocument();
    });
  });

  it('should display units sold information when expanded', async () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByText('See More'));

    await waitFor(() => {
      expect(screen.getByText('Units Sold This Year')).toBeInTheDocument();
      expect(screen.getByText('100 units')).toBeInTheDocument();
    });
  });

  it('should not break when stat is missing', async () => {
    const productWithoutStat = { ...mockProduct, stat: [] };
    renderWithTheme(<ProductCard product={productWithoutStat} />);

    fireEvent.click(screen.getByText('See More'));

    await waitFor(() => {
      expect(screen.queryByText('Yearly Sales')).not.toBeInTheDocument();
    });
  });
});
