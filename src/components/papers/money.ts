// Totals on the sample papers are computed from their lines, so a changed line can't leave a wrong total.
// Amounts are kept in centavos (integers) to avoid floating-point drift.
export const peso = (centavos: number) =>
  (centavos / 100).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

// VAT-inclusive total split into VATable sales and 12% VAT, rounded to the centavo.
export const vatSplit = (totalCentavos: number) => {
  const vatable = Math.round(totalCentavos / 1.12);
  return { vatable, vat: totalCentavos - vatable };
};
