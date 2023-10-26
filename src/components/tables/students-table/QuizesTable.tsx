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
  endsAt: string;
  startsAt: string;
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

export default function QuizesTable() {
  const { data, isLoading } = useClasses({});

  const lectures = data?.classes?.nodes;

  console.log(lectures);

  const quizes = lectures?.map((q: { course: any }) => q?.course?.quizzes);
  console.log(quizes);

  const flattenedQuizes = quizes.flat();
  console.log(flattenedQuizes);

  const columns: TableColumns<CourseSchedule>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Quiz",
      title: "Quiz",
      render: (data) => <p>{data?.name}</p>,
    },

    // {
    //   key: "Grade",
    //   title: "Grade",
    //   render: (data) => <p>{"100"}</p>,
    // },
    // {
    //   key: "Course",
    //   title: "Course",
    //   render: (data) => <p>{data?.course?.title}</p>,
    // },
    {
      key: "Starts At",
      title: "Starts At",
      render: (data) => <p>{new Date(data?.startsAt).toDateString()}</p>,
    },
    {
      key: "Ends At",
      title: "Ends At",
      render: (data) => <p>{new Date(data?.endsAt).toDateString()}</p>,
    },

    // {
    //   key: "Action",
    //   title: "Action",
    //   render: (data) => <p>{"Take Quiz"}</p>,
    // },
  ];

  // Add filter to group by campus

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {data && <Table data={flattenedQuizes} columns={columns} />}
    </Table.Wrapper>
  );
}
