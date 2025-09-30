/**
 * Format number to Indian Rupee (INR) currency format
 * @param amount - The amount to format
 * @param locale - The locale string (default: 'en-IN')
 * @returns Formatted INR string
 */
export const formatINR = (amount: number, locale: string = 'en-IN'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number to Indian Rupee compact format (e.g., ₹1.2L, ₹3.5Cr)
 * @param amount - The amount to format
 * @returns Formatted compact INR string
 */
export const formatINRCompact = (amount: number): string => {
  if (amount >= 10000000) {
    // Crores (10 million)
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    // Lakhs (100 thousand)
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) {
    // Thousands
    return `₹${(amount / 1000).toFixed(2)}K`;
  }
  return `₹${amount.toFixed(2)}`;
};
