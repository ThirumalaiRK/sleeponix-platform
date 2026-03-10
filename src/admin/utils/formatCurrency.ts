
export const formatCurrency = (amount: number): string => {
  // Using "Rs." instead of symbol (₹) because standard fonts in jsPDF 
  // do not support the Rupee glyph, causing rendering errors (e.g., ¹ 0).
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return `Rs. ${formatted}`;
};
