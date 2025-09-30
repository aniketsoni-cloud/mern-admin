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

export interface ProductStat {
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
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
  /**
   * Products data from API
   */
  data?: Product[];
  /**
   * Loading state
   */
  isLoading: boolean;
  /**
   * Error state
   */
  error?: Error | null;
}

export interface ProductCardProps {
  product: Product;
}
