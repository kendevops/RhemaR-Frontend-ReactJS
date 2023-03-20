import { Spinner } from "reactstrap";
import useAllClasses from "../../../hooks/queries/classes/useAllClasses";
import Table, { TableColumns } from "../../general/table/Table";
import useToggle from "../../../utility/hooks/useToggle";
import AddSchedule from "../../modals/AddSchedule";

type CourseSchedule = {
  id: string;
  name: string;
  type: string;
  status: string;
  endTime: string;
  startTime: string;
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

type EditScheduleProps = {
  data: CourseSchedule;
};

function EditSchedule({ data }: EditScheduleProps) {
  const [visibility, toggle] = useToggle();

  const defaultValues = {
    name: data?.name,
    course: data?.course?.title,
    endTime: data?.endTime,
    startTime: data?.startTime,
    instructorEmail: data?.instructor?.email,
  };

  return (
    <div>
      <u className="cursor-pointer" onClick={toggle}>
        Edit
      </u>

      <AddSchedule {...{ toggle, visibility, defaultValues }} />
    </div>
  );
}

export default function CoursesScheduleTable() {
  const { isLoading, data: classesData } = useAllClasses({
    status: "ongoing",
    startTime: "2022-12-06T21:56:53.900Z",
  });

  const data = classesData?.nodes;

  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Name", title: "Name", render: (data) => <p>{data?.name}</p> },
    {
      key: "Course",
      title: "Course",
      render: (data) => <p>{data?.course?.title}</p>,
    },
    {
      key: "Instructor",
      title: "Instructor",
      render: (data) => <p>{data?.instructor?.email}</p>,
    },
    {
      key: "Date",
      title: "Date",
      render: (data) => (
        <p>
          {new Date(data?.startTime).toDateString()} -{" "}
          {new Date(data?.endTime).toDateString()}
        </p>
      ),
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => <EditSchedule {...{ data }} />,
    },
  ];

  // Add filter to group by campus

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {data && <Table {...{ data, columns }} />}
    </Table.Wrapper>
  );
}
