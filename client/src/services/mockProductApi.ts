/**
 * Mock Product API Service
 * Provides mock data and simulates API calls with error handling
 */

import { Product, ApiResponse, ApiError } from '../types/product.types';

// Mock product data
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 8999,
    rating: 4.5,
    category: 'Electronics',
    supply: 150,
    stat: [
      {
        yearlySalesTotal: 1349850,
        yearlyTotalSoldUnits: 150,
        year: 2024,
      },
    ],
  },
  {
    _id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS',
    price: 15999,
    rating: 4.8,
    category: 'Electronics',
    supply: 200,
    stat: [
      {
        yearlySalesTotal: 3199800,
        yearlyTotalSoldUnits: 200,
        year: 2024,
      },
    ],
  },
  {
    _id: '3',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height',
    price: 2499,
    rating: 4.2,
    category: 'Accessories',
    supply: 300,
    stat: [
      {
        yearlySalesTotal: 749700,
        yearlyTotalSoldUnits: 300,
        year: 2024,
      },
    ],
  },
  {
    _id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches',
    price: 6999,
    rating: 4.6,
    category: 'Accessories',
    supply: 180,
    stat: [
      {
        yearlySalesTotal: 1259820,
        yearlyTotalSoldUnits: 180,
        year: 2024,
      },
    ],
  },
  {
    _id: '5',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    price: 3499,
    rating: 4.3,
    category: 'Accessories',
    supply: 250,
    stat: [
      {
        yearlySalesTotal: 874750,
        yearlyTotalSoldUnits: 250,
        year: 2024,
      },
    ],
  },
  {
    _id: '6',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 1999,
    rating: 4.4,
    category: 'Accessories',
    supply: 400,
    stat: [
      {
        yearlySalesTotal: 799600,
        yearlyTotalSoldUnits: 400,
        year: 2024,
      },
    ],
  },
  {
    _id: '7',
    name: 'Portable SSD',
    description: '1TB portable SSD with USB 3.2 Gen 2 for fast data transfer',
    price: 9999,
    rating: 4.7,
    category: 'Storage',
    supply: 120,
    stat: [
      {
        yearlySalesTotal: 1199880,
        yearlyTotalSoldUnits: 120,
        year: 2024,
      },
    ],
  },
  {
    _id: '8',
    name: 'Webcam HD',
    description: '1080p HD webcam with auto-focus and built-in microphone',
    price: 4499,
    rating: 4.1,
    category: 'Electronics',
    supply: 175,
    stat: [
      {
        yearlySalesTotal: 787325,
        yearlyTotalSoldUnits: 175,
        year: 2024,
      },
    ],
  },
];

// Simulate API delay
const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

// Error simulation config
interface MockApiConfig {
  shouldFail?: boolean;
  failureRate?: number;
  delayMs?: number;
}

let apiConfig: MockApiConfig = {
  shouldFail: false,
  failureRate: 0,
  delayMs: 500,
};

export const setMockApiConfig = (config: Partial<MockApiConfig>): void => {
  apiConfig = { ...apiConfig, ...config };
};

// Simulate API error
const simulateError = (): ApiError => {
  const errors: ApiError[] = [
    {
      message: 'Network connection failed. Please check your internet connection.',
      code: 'NETWORK_ERROR',
      status: 500,
    },
    {
      message: 'Server is temporarily unavailable. Please try again later.',
      code: 'SERVER_ERROR',
      status: 503,
    },
    {
      message: 'Request timeout. The server took too long to respond.',
      code: 'TIMEOUT_ERROR',
      status: 408,
    },
    {
      message: 'Access denied. You do not have permission to view this resource.',
      code: 'PERMISSION_ERROR',
      status: 403,
    },
  ];

  return errors[Math.floor(Math.random() * errors.length)];
};

// Check if request should fail based on failure rate
const shouldRequestFail = (): boolean => {
  if (apiConfig.shouldFail) return true;
  if (apiConfig.failureRate && apiConfig.failureRate > 0) {
    return Math.random() < apiConfig.failureRate;
  }
  return false;
};

/**
 * Fetch all products
 */
export const fetchProducts = async (): Promise<ApiResponse<Product[]>> => {
  await delay(apiConfig.delayMs || 500);

  if (shouldRequestFail()) {
    const error = simulateError();
    console.error('API Error:', error);
    return {
      data: undefined,
      error,
      isLoading: false,
    };
  }

  return {
    data: mockProducts,
    error: undefined,
    isLoading: false,
  };
};

/**
 * Fetch product by ID
 */
export const fetchProductById = async (id: string): Promise<ApiResponse<Product>> => {
  await delay(apiConfig.delayMs || 500);

  if (shouldRequestFail()) {
    const error = simulateError();
    return {
      data: undefined,
      error,
      isLoading: false,
    };
  }

  const product = mockProducts.find((p) => p._id === id);

  if (!product) {
    return {
      data: undefined,
      error: {
        message: `Product with ID ${id} not found`,
        code: 'NOT_FOUND',
        status: 404,
      },
      isLoading: false,
    };
  }

  return {
    data: product,
    error: undefined,
    isLoading: false,
  };
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (
  category: string
): Promise<ApiResponse<Product[]>> => {
  await delay(apiConfig.delayMs || 500);

  if (shouldRequestFail()) {
    const error = simulateError();
    return {
      data: undefined,
      error,
      isLoading: false,
    };
  }

  const products = mockProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return {
    data: products,
    error: undefined,
    isLoading: false,
  };
};

/**
 * Get product statistics
 */
export const getProductStats = (products: Product[]) => {
  const totalProducts = products.length;
  const totalRevenue = products.reduce(
    (sum, product) => sum + (product.stat[0]?.yearlySalesTotal || 0),
    0
  );
  const totalUnits = products.reduce(
    (sum, product) => sum + (product.stat[0]?.yearlyTotalSoldUnits || 0),
    0
  );
  const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / totalProducts;
  const averageRating = products.reduce((sum, product) => sum + product.rating, 0) / totalProducts;

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalProducts,
    totalRevenue,
    totalUnits,
    averagePrice,
    averageRating,
    categoryCounts,
  };
};

export default {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  getProductStats,
  setMockApiConfig,
};
