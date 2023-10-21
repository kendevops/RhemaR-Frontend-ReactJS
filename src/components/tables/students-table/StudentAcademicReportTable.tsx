import { Spinner } from "reactstrap";
import useAllClasses from "../../../hooks/queries/classes/useAllClasses";
import Table, { TableColumns } from "../../general/table/Table";
import useToggle from "../../../utility/hooks/useToggle";
import AddSchedule from "../../modals/AddSchedule";
import useClasses from "../../../hooks/queries/classes/useClasses";
import useUserCourses from "../../../hooks/queries/users/useUserCourses";
import useCourses from "../../../hooks/queries/classes/useCourses";

type CourseSchedule = {
  report: any;
  id: string;
  name: string;
  type: string;
  status: string;
  endTime: string;
  startTime: string;
  session: string;
  campus: string;
  createdAt: string;
  attendances: any;
  course: {
    id: string;
    name: string;
    type: string;
    attendances?: any;
  };
  instructor: {
    id: string;
    email: string;
  };
};

//attendances > sectionsAttendance
export default function StudentAcademicReportTable() {
  const { data, isLoading } = useClasses({});
  const { data: coursesData, isLoading: isLoadingCoursesData } = useCourses();

  console.log(coursesData?.courses?.nodes);

  const lectures = data?.classes?.nodes;

  console.log(lectures);

  const coursesWithProgress = coursesData?.courses?.nodes?.filter(
    (cls: any) => cls?.report?.completion
  );

  console.log(coursesWithProgress);

  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },

    {
      key: "Course",
      title: "Course",
      render: (data) => <p>{data?.name}</p>,
    },

    {
      key: "Option",
      title: "Option",
      render: (data) => <p>{data?.type}</p>,
    },

    {
      key: "Attendance",
      title: "Attendance  (%)",
      render: (data) => {
        const att = data?.attendances;
        console.log(att);

        return <p>{data?.report?.completion}%</p>;
      },
    },
    {
      key: "Grade",
      title: "Grade",
      render: (data) => <p>{"100"}</p>,
    },
  ];

  // Add filter to group by campus

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {data && <Table data={coursesWithProgress} columns={columns} />}
    </Table.Wrapper>
  );
}
