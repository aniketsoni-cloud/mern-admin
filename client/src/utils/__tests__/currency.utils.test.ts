/**
 * Currency Utilities Unit Tests
 */

import { formatCurrency, formatINR, formatUSD, convertUSDToINR, formatNumber } from '../currency.utils';

describe('Currency Utils', () => {
  describe('formatCurrency', () => {
    it('should format amount in INR with Indian locale', () => {
      const result = formatCurrency(1000, 'INR', 'en-IN');
      expect(result).toContain('1,000');
      expect(result).toContain('₹');
    });

    it('should format amount in USD with US locale', () => {
      const result = formatCurrency(1000, 'USD', 'en-US');
      expect(result).toContain('1,000');
      expect(result).toContain('$');
    });

    it('should handle decimal values correctly', () => {
      const result = formatCurrency(1234.56, 'INR', 'en-IN');
      expect(result).toContain('1,234.56');
    });

    it('should handle zero correctly', () => {
      const result = formatCurrency(0, 'INR', 'en-IN');
      expect(result).toContain('0.00');
    });

    it('should handle negative values correctly', () => {
      const result = formatCurrency(-500, 'INR', 'en-IN');
      expect(result).toContain('-500');
    });

    it('should fallback gracefully on error', () => {
      const result = formatCurrency(1000, 'INVALID' as any, 'en-IN');
      expect(result).toContain('1000.00');
    });
  });

  describe('formatINR', () => {
    it('should format amount in INR', () => {
      const result = formatINR(5000);
      expect(result).toContain('5,000');
      expect(result).toContain('₹');
    });

    it('should format large amounts correctly', () => {
      const result = formatINR(1000000);
      expect(result).toContain('10,00,000');
    });
  });

  describe('formatUSD', () => {
    it('should format amount in USD', () => {
      const result = formatUSD(5000);
      expect(result).toContain('5,000');
      expect(result).toContain('$');
    });
  });

  describe('convertUSDToINR', () => {
    it('should convert USD to INR with default rate', () => {
      const result = convertUSDToINR(100);
      expect(result).toBe(8300);
    });

    it('should convert USD to INR with custom rate', () => {
      const result = convertUSDToINR(100, 80);
      expect(result).toBe(8000);
    });

    it('should handle decimal values', () => {
      const result = convertUSDToINR(10.5, 83);
      expect(result).toBe(871.5);
    });
  });

  describe('formatNumber', () => {
    it('should format number with Indian locale', () => {
      const result = formatNumber(100000, 'en-IN');
      expect(result).toBe('1,00,000');
    });

    it('should format number with US locale', () => {
      const result = formatNumber(100000, 'en-US');
      expect(result).toBe('100,000');
    });

    it('should handle decimal numbers', () => {
      const result = formatNumber(1234.56, 'en-IN');
      expect(result).toContain('1,234.56');
    });

    it('should fallback gracefully on error', () => {
      const result = formatNumber(1000, 'invalid-locale');
      expect(result).toBe('1000');
    });
  });
});
