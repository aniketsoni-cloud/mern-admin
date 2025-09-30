import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
} from 'chart.js';

import { ProductCardProps } from 'types/product.types';
import { formatINR, formatINRCompact } from 'utils/formatINR';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const { _id, name, description, price, rating, category, supply, stat } = product;

  // Prepare chart data from monthlyData
  const monthlyData = stat[0]?.monthlyData || [];
  const chartData = {
    labels: monthlyData.map((m) => m.month),
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlyData.map((m) => m.totalSales),
        borderColor: theme.palette.secondary.main,
        backgroundColor: `${theme.palette.secondary.main}33`,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `Sales: ${formatINR(context.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="article"
      aria-label={`Product: ${name}`}
    >
      {/* Content */}
      <CardContent sx={{ flex: 1 }}>
        {/* Category */}
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>

        {/* Name */}
        <Typography variant="h5" component="h3" gutterBottom>
          {name}
        </Typography>

        {/* Price */}
        <Typography
          sx={{ mb: '1.5rem' }}
          color={theme.palette.secondary[400]}
          aria-label={`Price: ${formatINR(price)}`}
        >
          {formatINR(price)}
        </Typography>

        {/* Rating */}
        <Rating
          value={rating}
          readOnly
          aria-label={`Rating: ${rating} out of 5 stars`}
        />

        {/* Description */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description}
        </Typography>

        {/* Sales Sparkline Chart */}
        {monthlyData.length > 0 && (
          <Box sx={{ height: 60, mt: 2 }} aria-label="Monthly sales trend chart">
            <Line data={chartData} options={chartOptions} />
          </Box>
        )}
      </CardContent>

      {/* See More/See Less */}
      <CardActions>
        <Button
          variant="text"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`product-details-${_id}`}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      </CardActions>

      {/* More Info */}
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        id={`product-details-${_id}`}
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>
            <strong>ID:</strong> {_id}
          </Typography>
          <Typography>
            <strong>Supply Left:</strong> {supply.toLocaleString('en-IN')}
          </Typography>
          <Typography>
            <strong>Yearly Sales:</strong>{' '}
            {formatINRCompact(stat[0]?.yearlySalesTotal || 0)}
          </Typography>
          <Typography>
            <strong>Yearly Units Sold:</strong>{' '}
            {(stat[0]?.yearlyTotalSoldUnits || 0).toLocaleString('en-IN')}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
