import { Spinner } from "reactstrap";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import NewSession from "../../modals/NewSession";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";

interface Props {
  data: any;
  onCreate?: VoidFunction;
}

function ModifySession({ data, onCreate }: Props) {
  const [visibility, toggle] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const defaultValues = {
    name: data?.name,
    startDate: new Date(data?.startDate).toDateString(),
    endDate: new Date(data?.endDate).toDateString(),
    id: data?.id,
  };

  const handleDelete = () => {};

  console.log(data);

  return (
    <>
      <p
        className=""
        style={{ color: "red", cursor: "pointer" }}
        onClick={toggleDeleteModal}
      >
        Delete
      </p>
      <p onClick={toggle} style={{ cursor: "pointer" }}>
        Edit
      </p>
      <ConfirmDeleteModal
        visibility={visibilityDeleteModal}
        toggle={toggleDeleteModal}
        // onDelete={handleDelete}
        defaultValues={defaultValues}
      />
      <NewSession {...{ visibility, toggle, defaultValues, onCreate }} />
    </>
  );
}

export default function AcademicSessionTable() {
  const { data: sessionsData, isLoading, refetch } = useAcademicSessions();
  const data = sessionsData?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
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
