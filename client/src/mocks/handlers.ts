import { rest } from 'msw';
import { Product } from 'types/product.types';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5001';

// Mock product data
const mockProducts: Product[] = [
  {
    _id: '63701cc1f032396ccb559001',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 8999,
    rating: 4.5,
    category: 'Electronics',
    supply: 150,
    stat: [
      {
        _id: '63701cc1f032396ccb559101',
        productId: '63701cc1f032396ccb559001',
        yearlySalesTotal: 1234567,
        yearlyTotalSoldUnits: 450,
        year: 2023,
        monthlyData: [
          { month: 'January', totalSales: 95000, totalUnits: 35 },
          { month: 'February', totalSales: 110000, totalUnits: 42 },
          { month: 'March', totalSales: 105000, totalUnits: 38 },
          { month: 'April', totalSales: 98000, totalUnits: 36 },
          { month: 'May', totalSales: 125000, totalUnits: 48 },
          { month: 'June', totalSales: 115000, totalUnits: 44 },
        ],
        dailyData: [],
      },
    ],
  },
  {
    _id: '63701cc1f032396ccb559002',
    name: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with health tracking',
    price: 15999,
    rating: 4.8,
    category: 'Wearables',
    supply: 200,
    stat: [
      {
        _id: '63701cc1f032396ccb559102',
        productId: '63701cc1f032396ccb559002',
        yearlySalesTotal: 2456789,
        yearlyTotalSoldUnits: 550,
        year: 2023,
        monthlyData: [
          { month: 'January', totalSales: 180000, totalUnits: 65 },
          { month: 'February', totalSales: 195000, totalUnits: 72 },
          { month: 'March', totalSales: 210000, totalUnits: 78 },
          { month: 'April', totalSales: 198000, totalUnits: 68 },
          { month: 'May', totalSales: 225000, totalUnits: 85 },
          { month: 'June', totalSales: 240000, totalUnits: 92 },
        ],
        dailyData: [],
      },
    ],
  },
  {
    _id: '63701cc1f032396ccb559003',
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic laptop stand with adjustable height',
    price: 2499,
    rating: 4.2,
    category: 'Accessories',
    supply: 300,
    stat: [
      {
        _id: '63701cc1f032396ccb559103',
        productId: '63701cc1f032396ccb559003',
        yearlySalesTotal: 567890,
        yearlyTotalSoldUnits: 280,
        year: 2023,
        monthlyData: [
          { month: 'January', totalSales: 45000, totalUnits: 42 },
          { month: 'February', totalSales: 48000, totalUnits: 45 },
          { month: 'March', totalSales: 52000, totalUnits: 50 },
          { month: 'April', totalSales: 46000, totalUnits: 44 },
          { month: 'May', totalSales: 55000, totalUnits: 52 },
          { month: 'June', totalSales: 58000, totalUnits: 54 },
        ],
        dailyData: [],
      },
    ],
  },
  {
    _id: '63701cc1f032396ccb559004',
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming mechanical keyboard with RGB lighting',
    price: 6999,
    rating: 4.7,
    category: 'Gaming',
    supply: 120,
    stat: [
      {
        _id: '63701cc1f032396ccb559104',
        productId: '63701cc1f032396ccb559004',
        yearlySalesTotal: 987654,
        yearlyTotalSoldUnits: 380,
        year: 2023,
        monthlyData: [
          { month: 'January', totalSales: 72000, totalUnits: 58 },
          { month: 'February', totalSales: 85000, totalUnits: 65 },
          { month: 'March', totalSales: 92000, totalUnits: 70 },
          { month: 'April', totalSales: 78000, totalUnits: 60 },
          { month: 'May', totalSales: 95000, totalUnits: 72 },
          { month: 'June', totalSales: 102000, totalUnits: 78 },
        ],
        dailyData: [],
      },
    ],
  },
];

export const handlers = [
  // Get Products
  rest.get(`${baseUrl}/client/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  }),

  // You can add more handlers for other endpoints here
];
