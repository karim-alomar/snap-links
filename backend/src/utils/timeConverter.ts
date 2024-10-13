export const daysToSeconds = (days: number) => {
  return days * 24 * 60 * 60;
};

export const monthsToSeconds = (months: number) => {
  const secondsInMonth = 30 * 24 * 60 * 60;
  return Number(months) * secondsInMonth;
};
