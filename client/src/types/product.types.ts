export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
}

export interface ProductStat {
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  dailyData: {
    date: string;
    totalSales: number;
    totalUnits: number;
  }[];
}
