import { Spinner } from "reactstrap";
import useAllClasses from "../../../hooks/queries/classes/useAllClasses";
import Table, { TableColumns } from "../../general/table/Table";
import useToggle from "../../../utility/hooks/useToggle";
import AddSchedule from "../../modals/AddSchedule";
import useClasses from "../../../hooks/queries/classes/useClasses";
import useCourses from "../../../hooks/queries/classes/useCourses";

type CourseSchedule = {
  report: any;
  totalHours: number;
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
    code: string;
    type: string;
  };
  instructor: {
    id: string;
    email: string;
  };
};

export default function StudentScheduleTable() {
  const { data, isLoading } = useClasses({});
  const { data: coursesData } = useCourses();

  console.log(coursesData?.courses?.nodes);

  const courses = coursesData?.courses?.nodes;

  const lectures = data?.classes?.nodes;

  console.log(lectures);

  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: " Date",
      title: " Date",
      render: (data) => (
        <p>
          {new Date(data?.onlineStartDateTime).toDateString()} -{" "}
          {new Date(data?.onlineEndDateTime).toDateString()}
        </p>
      ),
    },
    {
      key: "Course",
      title: "Course",
      render: (data) => <p>{data?.course?.name}</p>,
    },
    {
      key: "Code",
      title: "Code",
      render: (data) => <p>{data?.course?.code}</p>,
    },
    {
      key: "Type",
      title: "Type",
      render: (data) => <p>{data?.course?.type}</p>,
    },
    // {
    //   key: "Class",
    //   title: "Class",
    //   render: (data) => <p>{data?.name}</p>,
    // },

    // {
    //   key: "Hour",
    //   title: "Hour",
    //   render: (data) => <p>{data?.totalHours}</p>,
    // },

    {
      key: "Done",
      title: "Done",
      render: (data) => (
        <p>{data?.report?.completion === 100 ? "Yes" : "No"}</p>
      ),
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
