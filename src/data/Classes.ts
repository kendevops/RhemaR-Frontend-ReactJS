type Class = {
  startDate: Date;
  endDate?: Date;
  title: string;
};

export const WeekendClasses: Class[] = [
  {
    startDate: new Date("2022-10-9"),
    endDate: new Date("2022-10-11"),
    title: "Christ the Healer",
  },
  {
    startDate: new Date("2022-10-23"),
    endDate: new Date("2022-10-25"),
    title: "Paul's Theology of Righteousness",
  },
  {
    startDate: new Date("2022-10-30"),
    title: "Manifestations of the Spirit",
  },
  {
    startDate: new Date("2022-11-6"),
    endDate: new Date("2022-11-8"),
    title: "Life of Honour",
  },
  {
    startDate: new Date("2023-02-20"),
    endDate: new Date("2023-02-22"),
    title: "New Testament Literature",
  },
];
