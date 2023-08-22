import { Spinner } from "reactstrap";
import useAllClasses from "../../../hooks/queries/classes/useAllClasses";
import Table, { TableColumns } from "../../general/table/Table";
import useToggle from "../../../utility/hooks/useToggle";
import AddSchedule from "../../modals/AddSchedule";
import useClasses from "../../../hooks/queries/classes/useClasses";

type CourseSchedule = {
  id: string;
  name: string;
  type: string;
  status: string;
  endTime: string;
  startTime: string;
  session: string;
  campus: string;
  createdAt: string;
  course: {
    id: string;
    title: string;
  };
  instructor: {
    id: string;
    email: string;
  };
};

export default function StudentScheduleTable() {
  const { data, isLoading } = useClasses({
    startTime: "2022-12-01T21:56:53.900Z",
  });

  const lectures = data?.classes?.nodes;

  console.log(lectures);

  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Onsite Date",
      title: "Onsite Date",
      render: (data) => (
        <p>
          {new Date(data?.startTime).toDateString()} -{" "}
          {new Date(data?.endTime).toDateString()}
        </p>
      ),
    },
    {
      key: "Course",
      title: "Course",
      render: (data) => <p>{data?.course?.title}</p>,
    },
    {
      key: "Reading Assignment",
      title: "Reading Assignment",
      render: (data) => <p>{data?.name}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{"Level"}</p>,
    },
    {
      key: "Hour",
      title: "Hour",
      render: (data) => <p>{"12"}</p>,
    },
    // {
    //   key: "Action",
    //   title: "Action",
    //   render: (data) => <EditSchedule {...{ data }} />,
    // },
  ];

  // Add filter to group by campus

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {data && <Table data={lectures} columns={columns} />}
    </Table.Wrapper>
  );
}
