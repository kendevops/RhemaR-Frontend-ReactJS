export default function getMonth(date: Date) {
  return date.toLocaleString("en-us", { month: "short" });
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { months };
