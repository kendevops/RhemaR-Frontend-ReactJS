export default function isWithinCurrentDateRange(
  startTime: string,
  endTime: string
) {
  const obj = {
    startTime,
    endTime,
  };

  const currentDate = new Date();
  const startDate = new Date(obj.startTime);
  const endDate = new Date(obj.endTime);

  return currentDate >= startDate && currentDate <= endDate;
}
