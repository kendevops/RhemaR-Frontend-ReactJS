import { Spinner } from "reactstrap";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import NewSession from "../../modals/NewSession";

interface Props {
  data: any;
  onCreate?: VoidFunction;
}

function ModifySession({ data, onCreate }: Props) {
  const [visibility, toggle] = useToggle();
  const defaultValues = {
    name: data?.name,
    startDate: new Date(data?.startDate).toDateString(),
    endDate: new Date(data?.endDate).toDateString(),
  };

  return (
    <>
      {/* <u
        onClick={toggle}
        className="text-info click text-center "
        data-bs-toggle="modal"
        data-bs-target="#academicSessionModal"
      >
        Edit
      </u> */}

      <p onClick={toggle} style={{ cursor: "pointer" }}>
        Edit
      </p>
      <NewSession {...{ visibility, toggle, defaultValues, onCreate }} />
    </>
  );
}

export default function AcademicSessionTable() {
  const { data: sessionsData, isLoading, refetch } = useAcademicSessions();
  const data = sessionsData?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i}</p> },
    {
      key: "Academic Session",
      title: "Academic Session",
      render: (data) => <p>{data?.name}</p>,
    },
    {
      key: "Start Date",
      title: "Start Date",
      render: (data) => <p>{new Date(data?.startDate).toDateString()}</p>,
    },
    {
      key: "End Date",
      title: "End Date",
      render: (data) => <p>{new Date(data?.endDate).toDateString()}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        return (
          <div className="d-flex gap-3">
            <p className="" style={{ color: "red", cursor: "pointer" }}>
              Delete
            </p>
            <ModifySession onCreate={refetch} data={data} />
          </div>
        );
      },
    },
  ];

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      <Table {...{ data, columns }} />
    </Table.Wrapper>
  );
}
