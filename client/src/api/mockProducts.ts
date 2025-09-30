import { Product, ProductStat } from '../types/product.types';

export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Product 1',
    price: 100,
    description: 'This is product 1',
    category: 'Category A',
    rating: 4.5,
    supply: 100,
    yearlySalesTotal: 50000,
    yearlyTotalSoldUnits: 500,
  },
  {
    _id: '2',
    name: 'Product 2',
    price: 200,
    description: 'This is product 2',
    category: 'Category B',
    rating: 4.0,
    supply: 200,
    yearlySalesTotal: 100000,
    yearlyTotalSoldUnits: 500,
  },
];

export const mockProductStats: ProductStat[] = [
  {
    productId: '1',
    yearlySalesTotal: 50000,
    yearlyTotalSoldUnits: 500,
    monthlyData: [
      { month: 'Jan', totalSales: 4000, totalUnits: 40 },
      { month: 'Feb', totalSales: 5000, totalUnits: 50 },
      { month: 'Mar', totalSales: 4500, totalUnits: 45 },
    ],
    dailyData: [],
  },
  {
    productId: '2',
    yearlySalesTotal: 100000,
    yearlyTotalSoldUnits: 500,
    monthlyData: [
      { month: 'Jan', totalSales: 8000, totalUnits: 40 },
      { month: 'Feb', totalSales: 10000, totalUnits: 50 },
      { month: 'Mar', totalSales: 9000, totalUnits: 45 },
    ],
    dailyData: [],
  },
];

export const getMockProducts = (): Promise<{ data: Product[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockProducts });
    }, 500);
  });
};

export const getMockProductStats = (): Promise<{ data: ProductStat[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockProductStats });
    }, 500);
  });
};
