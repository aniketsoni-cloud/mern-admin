/**
 * Product Card Component
 * Individual product card with accessibility features
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Collapse,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { ProductCardProps } from '../../types/product.types';
import { formatINR } from '../../utils/currency.utils';
import { handleKeyPress, createAriaLabel } from '../../utils/accessibility.utils';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  currency = 'INR',
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  const { _id, name, description, price, rating, category, supply, stat } = product;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleCardKeyPress = (event: React.KeyboardEvent) => {
    handleKeyPress(event, {
      onEnter: handleCardClick,
      onSpace: handleCardClick,
    });
  };

  const ariaLabel = createAriaLabel({
    name,
    price,
    category,
    rating,
  });

  // Format price based on currency
  const formattedPrice = currency === 'INR' ? formatINR(price) : `$${price.toFixed(2)}`;

  return (
    <Card
      ref={cardRef}
      id={`product-card-${_id}`}
      role="article"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleCardKeyPress}
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: onClick ? 'translateY(-4px)' : 'none',
          boxShadow: onClick ? 4 : 1,
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={onClick ? handleCardClick : undefined}
    >
      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Category Chip */}
        <Chip
          label={category}
          size="small"
          sx={{
            fontSize: 12,
            backgroundColor: theme.palette.secondary[700],
            color: theme.palette.getContrastText(theme.palette.secondary[700]),
            mb: 1,
          }}
          aria-label={`Category: ${category}`}
        />

        {/* Name */}
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {name}
        </Typography>

        {/* Price */}
        <Typography
          variant="h6"
          sx={{
            mb: 1.5,
            color: theme.palette.secondary[400],
            fontWeight: 700,
          }}
          aria-label={`Price: ${formattedPrice}`}
        >
          {formattedPrice}
        </Typography>

        {/* Rating */}
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating
            value={rating}
            readOnly
            precision={0.1}
            size="small"
            aria-label={`Rating: ${rating} out of 5 stars`}
          />
          <Typography variant="body2" color="text.secondary">
            ({rating.toFixed(1)})
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ mt: 'auto', pt: 0 }}>
        <Button
          ref={expandButtonRef}
          variant="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleExpand();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            handleKeyPress(e, {
              onEnter: handleExpand,
              onSpace: handleExpand,
            });
          }}
          aria-expanded={isExpanded}
          aria-controls={`product-details-${_id}`}
          sx={{
            color: theme.palette.secondary[300],
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      </CardActions>

      {/* Expanded Details */}
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        id={`product-details-${_id}`}
        role="region"
        aria-label={`Additional details for ${name}`}
      >
        <CardContent
          sx={{
            color: theme.palette.neutral[300],
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.2)'
              : 'rgba(0, 0, 0, 0.05)',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Product ID
              </Typography>
              <Typography variant="body2">{_id}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Supply Available
              </Typography>
              <Typography variant="body2">
                {supply} units
                {supply < 50 && (
                  <Chip
                    label="Low Stock"
                    size="small"
                    color="warning"
                    sx={{ ml: 1, height: 20 }}
                  />
                )}
              </Typography>
            </Box>

            {stat && stat[0] && (
              <>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Yearly Sales
                  </Typography>
                  <Typography variant="body2">
                    {formatINR(stat[0].yearlySalesTotal)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Units Sold This Year
                  </Typography>
                  <Typography variant="body2">
                    {stat[0].yearlyTotalSoldUnits.toLocaleString('en-IN')} units
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
