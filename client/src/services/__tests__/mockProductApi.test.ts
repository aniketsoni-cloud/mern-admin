/**
 * Mock Product API Unit Tests
 */

import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  getProductStats,
  setMockApiConfig,
} from '../mockProductApi';

describe('Mock Product API', () => {
  beforeEach(() => {
    setMockApiConfig({
      shouldFail: false,
      failureRate: 0,
      delayMs: 0,
    });
  });

  describe('fetchProducts', () => {
    it('should fetch all products successfully', async () => {
      const response = await fetchProducts();

      expect(response.isLoading).toBe(false);
      expect(response.error).toBeUndefined();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data!.length).toBeGreaterThan(0);
    });

    it('should return products with correct structure', async () => {
      const response = await fetchProducts();
      const product = response.data![0];

      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('rating');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('supply');
      expect(product).toHaveProperty('stat');
      expect(Array.isArray(product.stat)).toBe(true);
    });

    it('should return error when API is configured to fail', async () => {
      setMockApiConfig({ shouldFail: true });
      const response = await fetchProducts();

      expect(response.isLoading).toBe(false);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
      expect(response.error?.message).toBeDefined();
      expect(response.error?.code).toBeDefined();
    });

    it('should respect custom delay', async () => {
      setMockApiConfig({ delayMs: 100 });
      const startTime = Date.now();
      await fetchProducts();
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });
  });

  describe('fetchProductById', () => {
    it('should fetch product by valid ID', async () => {
      const response = await fetchProductById('1');

      expect(response.isLoading).toBe(false);
      expect(response.error).toBeUndefined();
      expect(response.data).toBeDefined();
      expect(response.data?._id).toBe('1');
    });

    it('should return error for invalid ID', async () => {
      const response = await fetchProductById('invalid-id');

      expect(response.isLoading).toBe(false);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
      expect(response.error?.code).toBe('NOT_FOUND');
      expect(response.error?.status).toBe(404);
    });

    it('should return error when API is configured to fail', async () => {
      setMockApiConfig({ shouldFail: true });
      const response = await fetchProductById('1');

      expect(response.isLoading).toBe(false);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
    });
  });

  describe('fetchProductsByCategory', () => {
    it('should fetch products by category', async () => {
      const response = await fetchProductsByCategory('Electronics');

      expect(response.isLoading).toBe(false);
      expect(response.error).toBeUndefined();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data!.every(p => p.category === 'Electronics')).toBe(true);
    });

    it('should be case-insensitive', async () => {
      const response = await fetchProductsByCategory('electronics');

      expect(response.data).toBeDefined();
      expect(response.data!.length).toBeGreaterThan(0);
    });

    it('should return empty array for non-existent category', async () => {
      const response = await fetchProductsByCategory('NonExistent');

      expect(response.isLoading).toBe(false);
      expect(response.error).toBeUndefined();
      expect(response.data).toBeDefined();
      expect(response.data!.length).toBe(0);
    });

    it('should return error when API is configured to fail', async () => {
      setMockApiConfig({ shouldFail: true });
      const response = await fetchProductsByCategory('Electronics');

      expect(response.isLoading).toBe(false);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
    });
  });

  describe('getProductStats', () => {
    it('should calculate total products correctly', async () => {
      const response = await fetchProducts();
      const stats = getProductStats(response.data!);

      expect(stats.totalProducts).toBe(response.data!.length);
    });

    it('should calculate total revenue correctly', async () => {
      const response = await fetchProducts();
      const stats = getProductStats(response.data!);

      const expectedRevenue = response.data!.reduce(
        (sum, p) => sum + (p.stat[0]?.yearlySalesTotal || 0),
        0
      );

      expect(stats.totalRevenue).toBe(expectedRevenue);
    });

    it('should calculate total units correctly', async () => {
      const response = await fetchProducts();
      const stats = getProductStats(response.data!);

      const expectedUnits = response.data!.reduce(
        (sum, p) => sum + (p.stat[0]?.yearlyTotalSoldUnits || 0),
        0
      );

      expect(stats.totalUnits).toBe(expectedUnits);
    });

    it('should calculate average price correctly', async () => {
      const response = await fetchProducts();
      const stats = getProductStats(response.data!);

      const expectedAvgPrice =
        response.data!.reduce((sum, p) => sum + p.price, 0) / response.data!.length;

      expect(stats.averagePrice).toBe(expectedAvgPrice);
    });

    it('should calculate average rating correctly', async () => {
      const response = await fetchProducts();
      const stats = getProductStats(response.data!);

      const expectedAvgRating =
        response.data!.reduce((sum, p) => sum + p.rating, 0) / response.data!.length;

      expect(stats.averageRating).toBe(expectedAvgRating);
    });

    it('should count products by category', async () => {
      const response = await fetchProducts();
      const stats = getProductStats(response.data!);

      expect(stats.categoryCounts).toBeDefined();
      expect(typeof stats.categoryCounts).toBe('object');

      const totalCounted = Object.values(stats.categoryCounts).reduce(
        (sum: number, count) => sum + count,
        0
      );
      expect(totalCounted).toBe(response.data!.length);
    });

    it('should handle empty product array', () => {
      const stats = getProductStats([]);

      expect(stats.totalProducts).toBe(0);
      expect(stats.totalRevenue).toBe(0);
      expect(stats.totalUnits).toBe(0);
      expect(isNaN(stats.averagePrice)).toBe(true);
      expect(isNaN(stats.averageRating)).toBe(true);
    });
  });
});
