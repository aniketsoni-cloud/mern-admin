/**
 * Product Charts Component
 * Provides Chart.js visualizations for product data
 */

import React, { useMemo } from 'react';
import { Box, Typography, useTheme, Paper, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Product } from '../../types/product.types';
import { formatINR, formatNumber } from '../../utils/currency.utils';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProductChartsProps {
  products: Product[];
}

export const ProductCharts: React.FC<ProductChartsProps> = ({ products }) => {
  const theme = useTheme();

  // Calculate chart data
  const chartData = useMemo(() => {
    // Category-wise product count
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Category-wise revenue
    const categoryRevenue = products.reduce((acc, product) => {
      const revenue = product.stat[0]?.yearlySalesTotal || 0;
      acc[product.category] = (acc[product.category] || 0) + revenue;
      return acc;
    }, {} as Record<string, number>);

    // Top products by revenue
    const topProducts = [...products]
      .sort((a, b) => {
        const revenueA = a.stat[0]?.yearlySalesTotal || 0;
        const revenueB = b.stat[0]?.yearlySalesTotal || 0;
        return revenueB - revenueA;
      })
      .slice(0, 5);

    // Rating distribution
    const ratingDistribution = products.reduce((acc, product) => {
      const rating = Math.floor(product.rating);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      categoryCount,
      categoryRevenue,
      topProducts,
      ratingDistribution,
    };
  }, [products]);

  // Chart colors based on theme
  const colors = {
    primary: theme.palette.mode === 'dark' ? 'rgba(77, 84, 125, 0.8)' : 'rgba(33, 41, 92, 0.8)',
    secondary: theme.palette.mode === 'dark' ? 'rgba(255, 209, 102, 0.8)' : 'rgba(204, 167, 82, 0.8)',
    success: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(46, 125, 50, 0.8)',
    warning: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.8)' : 'rgba(230, 137, 0, 0.8)',
    error: theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.8)' : 'rgba(211, 47, 47, 0.8)',
    info: theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.8)' : 'rgba(25, 118, 210, 0.8)',
    text: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    grid: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  // Bar Chart: Category-wise Product Count
  const categoryCountData = {
    labels: Object.keys(chartData.categoryCount),
    datasets: [
      {
        label: 'Number of Products',
        data: Object.values(chartData.categoryCount),
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
      },
    ],
  };

  // Line Chart: Top 5 Products by Revenue
  const topProductsData = {
    labels: chartData.topProducts.map((p) => p.name),
    datasets: [
      {
        label: 'Revenue (INR)',
        data: chartData.topProducts.map((p) => p.stat[0]?.yearlySalesTotal || 0),
        borderColor: colors.secondary,
        backgroundColor: colors.secondary.replace('0.8', '0.2'),
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Doughnut Chart: Category-wise Revenue Distribution
  const categoryRevenueData = {
    labels: Object.keys(chartData.categoryRevenue),
    datasets: [
      {
        label: 'Revenue (INR)',
        data: Object.values(chartData.categoryRevenue),
        backgroundColor: [
          colors.primary,
          colors.secondary,
          colors.success,
          colors.warning,
          colors.error,
          colors.info,
        ],
        borderWidth: 2,
        borderColor: theme.palette.background.default,
      },
    ],
  };

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: colors.text,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.alt,
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.grid,
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataset.label?.includes('Revenue')) {
                label += formatINR(context.parsed.y);
              } else {
                label += formatNumber(context.parsed.y);
              }
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: colors.text,
        },
        grid: {
          color: colors.grid,
        },
      },
      y: {
        ticks: {
          color: colors.text,
          callback: function (value: any) {
            return formatNumber(value);
          },
        },
        grid: {
          color: colors.grid,
        },
      },
    },
  };

  return (
    <Box
      sx={{ mt: 3 }}
      role="region"
      aria-label="Product Analytics Charts"
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Product Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Category Count Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.alt,
              height: '100%',
            }}
            elevation={2}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Products by Category
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={categoryCountData}
                options={{
                  ...commonOptions,
                  scales: commonOptions.scales,
                }}
                aria-label="Bar chart showing number of products in each category"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Top Products Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.alt,
              height: '100%',
            }}
            elevation={2}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Top 5 Products by Revenue
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={topProductsData}
                options={{
                  ...commonOptions,
                  scales: commonOptions.scales,
                }}
                aria-label="Line chart showing top 5 products by revenue"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Category Revenue Doughnut Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.alt,
              height: '100%',
            }}
            elevation={2}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Revenue Distribution by Category
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Doughnut
                data={categoryRevenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right' as const,
                      labels: {
                        color: colors.text,
                        font: {
                          size: 11,
                        },
                      },
                    },
                    tooltip: {
                      backgroundColor: theme.palette.background.alt,
                      titleColor: colors.text,
                      bodyColor: colors.text,
                      borderColor: colors.grid,
                      borderWidth: 1,
                      callbacks: {
                        label: function (context: any) {
                          const label = context.label || '';
                          const value = context.parsed || 0;
                          const total = context.dataset.data.reduce(
                            (sum: number, val: number) => sum + val,
                            0
                          );
                          const percentage = ((value / total) * 100).toFixed(1);
                          return `${label}: ${formatINR(value)} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
                aria-label="Doughnut chart showing revenue distribution by category"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Summary Statistics */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.alt,
              height: '100%',
            }}
            elevation={2}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Summary Statistics
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Products
                </Typography>
                <Typography variant="h4">{products.length}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
                <Typography variant="h4">
                  {formatINR(
                    products.reduce(
                      (sum, p) => sum + (p.stat[0]?.yearlySalesTotal || 0),
                      0
                    )
                  )}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Average Price
                </Typography>
                <Typography variant="h4">
                  {formatINR(
                    products.reduce((sum, p) => sum + p.price, 0) / products.length
                  )}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
                <Typography variant="h4">
                  {(
                    products.reduce((sum, p) => sum + p.rating, 0) / products.length
                  ).toFixed(2)}{' '}
                  ★
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductCharts;
