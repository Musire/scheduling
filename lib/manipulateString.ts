

export function formatCurrency (input: string | number) {
  const amount = typeof input === 'string' ? parseFloat(input) : input;
  
  if (isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatWeekParam(dateStr: string) {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  // Split "2026-10-12" into ["2026", "10", "12"]
  const [, monthStr, dayStr] = dateStr.split('-');
  
  // Convert month string into an index (e.g., "10" -> 9)
  const monthIndex = parseInt(monthStr, 10) - 1;
  
  return `${months[monthIndex]} ${dayStr}`;
}
