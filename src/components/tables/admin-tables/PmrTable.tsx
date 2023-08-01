import { Spinner } from "reactstrap";
import useAllPmrs from "../../../hooks/queries/classes/useAllPmrs";
import Table from "../../general/table/Table";
import ViewPmrScoreModal from "../../modals/ViewPmrScoreModal";
import useToggle from "../../../utility/hooks/useToggle";

interface StudentData {
  date: string;
  timeCompleted: number;
  accomplishedMinistryDesc: string;
}

function ViewPmr({ data }: any) {
  const timeComp = (data?.studentData as StudentData[])?.reduce(
    (prev, curr) => prev + curr.timeCompleted,
    0
  );

  const [isOpen, toggle] = useToggle();

  return (
    <>
      {timeComp >= 100 && <u>View Student Attachment Score</u>}
      <ViewPmrScoreModal {...{ data, isOpen, toggle }} />
    </>
  );
}

export default function PmrTable() {
  const { data, isLoading } = useAllPmrs();

  const tableProps = {
    columns: [
      {
        key: "Student",
        title: "Student",
        render: (d: any) => {
          return <p>{d?.student?.email}</p>;
        },
      },
      {
        key: "Area",
        title: "Area",
        render: (d: any) => {
          return <p>{d?.area}</p>;
        },
      },
      {
        key: "Church",
        title: "Church",
        render: (d: any) => {
          return <p>{d?.church}</p>;
        },
      },
      {
        key: "Time Completed",
        title: "Time Completed",
        render: (d: any) => {
          const timeComp = (d?.studentData as StudentData[])?.reduce(
            (prev, curr) => prev + curr.timeCompleted,
            0
          );
          return <p>{timeComp}</p>;
        },
      },
      {
        key: "Action",
        render: (d: any) => {
          return <ViewPmr data={d} />;
        },
      },
    ],
    data: data?.nodes,
  };

  return (
    <>
      <Table.Wrapper>
        {isLoading && <Spinner />}
        {!!data && <Table {...tableProps} />}
      </Table.Wrapper>
    </>
  );
}
