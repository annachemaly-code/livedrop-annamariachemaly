
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}


export function formatNumber(amount: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale).format(amount);
}

export function formatPercent(value: number, fractionDigits: number = 1): string {
  return `${(value * 100).toFixed(fractionDigits)}%`;
}
