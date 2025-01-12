export function formatCurrency(value, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(value);
}
