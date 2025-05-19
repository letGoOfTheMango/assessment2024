export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0"); // * formating date function
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // * formating date function
  const year = date.getFullYear(); // * formating date function
  return `${day}.${month}.${year}`; // * formating date function
};