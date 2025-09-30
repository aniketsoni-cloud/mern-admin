/**
 * Currency Utility Functions
 * Handles currency formatting with INR localization
 */

export const formatCurrency = (
  amount: number,
  currency: 'INR' | 'USD' = 'INR',
  locale: string = 'en-IN'
): string => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency} ${amount.toFixed(2)}`;
  }
};

export const formatINR = (amount: number): string => {
  return formatCurrency(amount, 'INR', 'en-IN');
};

export const formatUSD = (amount: number): string => {
  return formatCurrency(amount, 'USD', 'en-US');
};

export const convertUSDToINR = (usdAmount: number, exchangeRate: number = 83.0): number => {
  return usdAmount * exchangeRate;
};

export const formatNumber = (num: number, locale: string = 'en-IN'): string => {
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch (error) {
    console.error('Error formatting number:', error);
    return num.toString();
  }
};
