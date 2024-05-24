export const getLocalDateStringInUTC = (): string => {
  const localDate = new Date();
  const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
  return utcDate.toISOString().split('T')[0]; // Return only the date part in YYYY-MM-DD format
};