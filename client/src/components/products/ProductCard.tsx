import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
} from '@mui/material';
import { Product, ProductStat } from 'types/product.types';
import ProductChart from './ProductChart';

interface ProductCardProps {
  product: Product & { stat: ProductStat };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const { _id, name, description, price, rating, category, supply, yearlySalesTotal, yearlyTotalSoldUnits, stat } = product;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          {formattedPrice}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`product-details-${_id}`}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      </CardActions>
      <Collapse
        id={`product-details-${_id}`}
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {yearlyTotalSoldUnits}
          </Typography>
          {stat && stat.monthlyData && <ProductChart data={stat.monthlyData} />}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
