export type Course = {
  title: string;
  completion: number;
  score?: number;
};

export const Courses: Course[] = [
  { title: "Pneumatology 1", completion: 1 },
  { title: "Aspects of Grace", completion: 100, score: 97 },
  { title: "Love: The Way to Victory", completion: 63 },
  { title: "Faith Foundations", completion: 30 },
];
