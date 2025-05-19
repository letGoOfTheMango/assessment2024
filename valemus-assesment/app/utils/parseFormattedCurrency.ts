export const parseFormattedCurrency = (value: string): number => { // * format currency
   return parseFloat(value.replace(/\./g, '').replace(',', '.'));
};