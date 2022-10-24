import Table, { TableColumns } from "../../general/table/Table";

type CourseSchedule = {
  name: string;
  level: string;
  classOption: string;
  date: Date;
};

const data: CourseSchedule[] = [
  {
    name: "Holy Spirit",
    classOption: "Night Class",
    date: new Date(),
    level: "level 1",
  },
  {
    name: "Pneumatology 1",
    classOption: "Night Class",
    date: new Date(),
    level: "level 2",
  },
  {
    name: "Aspects of Grace",
    classOption: "Weekend Class",
    date: new Date(),
    level: "level 1",
  },
  {
    name: "Love : The way to victory",
    classOption: "Night Class",
    date: new Date(),
    level: "level 1",
  },
];

export default function CoursesScheduleTable() {
  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Courses", title: "Courses", render: (data) => <p>{data?.name}</p> },
    { key: "Level", title: "Level", render: (data) => <p>{data?.level}</p> },
    {
      key: "Class Option",
      title: "Class Option",
      render: (data) => <p>{data?.classOption}</p>,
    },
    {
      key: "Date",
      title: "Date",
      render: (data) => <p>{data?.date.toDateString()}</p>,
    },
  ];

  return (
    <Table.Wrapper>
      <Table {...{ data, columns }} />
    </Table.Wrapper>
  );
}
