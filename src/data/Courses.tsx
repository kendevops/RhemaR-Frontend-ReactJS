export type Course = {
  title: string;
  completion: number;
  score?: number;
};

export type MissedCourse = {
  title: string;
  nextAvailableDate: Date;
};

export const Courses: Course[] = [
  { title: "Pneumatology 1", completion: 1 },
  { title: "Aspects of Grace", completion: 100, score: 97 },
  { title: "Love: The Way to Victory", completion: 63 },
  { title: "Faith Foundations", completion: 30 },
];

export const missedCourses: MissedCourse[] = [
  { title: "Life of Honour", nextAvailableDate: new Date() },
  { title: "Bibliology", nextAvailableDate: new Date() },
  { title: "Hermeneutics", nextAvailableDate: new Date() },
  { title: "Great Commission", nextAvailableDate: new Date() },
];
