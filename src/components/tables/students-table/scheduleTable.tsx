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
  onsiteStartDateTime: string;
  onsiteEndDateTime: string;
  onlineStartDateTime: string;
  onlineEndDateTime: string;
  session: string;
  campus: string;
  createdAt: string;
  course: {
    id: string;
    name: string;
  };
  instructor: {
    id: string;
    email: string;
  };
};

export default function StudentScheduleTable() {
  const { data, isLoading } = useClasses({});

  const lectures = data?.classes?.nodes;

  console.log(lectures);

  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Online Date",
      title: "Online Date",
      render: (data) => (
        <p>
          {new Date(data?.onlineStartDateTime).toDateString()} -{" "}
          {new Date(data?.onlineEndDateTime).toDateString()}
        </p>
      ),
    },

    {
      key: "Onsite Date",
      title: "Onsite Date",
      render: (data) => (
        <p>
          {new Date(data?.onsiteStartDateTime).toDateString()} -{" "}
          {new Date(data?.onsiteEndDateTime).toDateString()}
        </p>
      ),
    },
    {
      key: "Course",
      title: "Course",
      render: (data) => <p>{data?.course?.name}</p>,
    },
    {
      key: "Class",
      title: "Class",
      render: (data) => <p>{data?.name}</p>,
    },
    // {
    //   key: "Level",
    //   title: "Level",
    //   render: (data) => <p>{"Level"}</p>,
    // },
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
