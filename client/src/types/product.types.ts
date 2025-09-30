/**
 * Product Type Definitions
 * Type definitions for product-related data structures
 */

export interface ProductStat {
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year?: number;
  monthlyData?: MonthlyData[];
  dailyData?: DailyData[];
}

export interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

export interface DailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  supply: number;
  stat: ProductStat[];
}

export interface ProductListProps {
  products?: Product[];
  isLoading?: boolean;
  error?: Error | null;
  onProductClick?: (product: Product) => void;
  showCharts?: boolean;
  currency?: 'INR' | 'USD';
}

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  currency?: 'INR' | 'USD';
}

export interface ProductChartProps {
  data: Product[];
  theme?: any;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  isLoading: boolean;
}
