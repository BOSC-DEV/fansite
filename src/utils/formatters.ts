
/**
 * Format currency values without decimal places
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format dates to a readable string
 * Updated to accept either Date or string
 */
export const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj);
};

/**
 * Format a time string (e.g., "2 hours ago")
 * Updated to accept either Date or string
 */
export const formatTimeAgo = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  
  return Math.floor(seconds) + " seconds ago";
};

/**
 * Format a number range (e.g., "1-10 of 100")
 */
export const formatNumberRange = (start: number, end: number, total: number) => {
  return `${start}-${end} of ${total}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format a wallet address (e.g., "0x1234...5678")
 */
export const formatWalletAddress = (address: string) => {
  if (!address) return '';
  if (address.length <= 13) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
