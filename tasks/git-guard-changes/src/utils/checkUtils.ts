export const isNullValue = (value: string): boolean =>
  value === '' || value === null || value === undefined;
export const isNullArray = (value: string[]): boolean =>
  value === null || value === undefined || value.length === 0;
