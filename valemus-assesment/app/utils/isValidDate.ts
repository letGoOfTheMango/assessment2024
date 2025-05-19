export const isValidDate = (dateString: string): boolean => { // * to check if date is valid
  
  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;// DD.MM.YYYY
  const match = dateString.match(regex);

  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Check if date is valid
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};
