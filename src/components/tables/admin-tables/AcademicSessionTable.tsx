import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import NewSession from "../../modals/NewSession";

type SessionData = {
  title: string;
  startDate: Date;
  endDate: Date;
};

interface Props {
  data: SessionData;
}

const data: SessionData[] = [
  { endDate: new Date(), startDate: new Date(), title: "First Quarter" },
  { endDate: new Date(), startDate: new Date(), title: "Second Quarter" },
  { endDate: new Date(), startDate: new Date(), title: "Third Quarter" },
  { endDate: new Date(), startDate: new Date(), title: "Fourth Quarter" },
];

function ModifySession({ data }: Props) {
  const [visibility, toggle] = useToggle();
  const defaultValues = {
    academicSession: data?.title,
    startDate: data?.startDate?.toDateString(),
    endDate: data?.endDate?.toDateString(),
  };

  return (
    <>
      <u
        onClick={toggle}
        className="text-info click"
        data-bs-toggle="modal"
        data-bs-target="#academicSessionModal"
      >
        Modify Session
      </u>
      <NewSession {...{ visibility, toggle, defaultValues }} />
    </>
  );
}

export default function AcademicSessionTable() {
  const columns: TableColumns<SessionData>[] = [
    {
      key: "Academic Session",
      title: "Academic Session",
      render: (data) => <p>{data?.title}</p>,
    },
    {
      key: "Start Date",
      title: "Start Date",
      render: (data) => <p>{data?.startDate.toDateString()}</p>,
    },
    {
      key: "End Date",
      title: "End Date",
      render: (data) => <p>{data?.endDate.toDateString()}</p>,
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => <ModifySession data={data} />,
    },
  ];

  return (
    <Table.Wrapper>
      <Table {...{ data, columns }} />
    </Table.Wrapper>
  );
}
