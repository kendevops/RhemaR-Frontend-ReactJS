import { Spinner } from "reactstrap";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import NewSession from "../../modals/NewSession";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import useDeleteSession from "../../../hooks/mutations/classes/useDeleteSession";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";

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

  const deleteIt = useDeleteSession(defaultValues?.id as string);

  const isLoading = deleteIt?.isLoading;

  const deleteMutation = useDeleteSession(defaultValues?.id as string);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Session created successfully"}
        />,
        ToastContent.Config
      );
      toggleDeleteModal();
    } catch (error: any) {
      console.error("Error deleting resource", error);
      toast.error(
        <ToastContent
          type={"error"}
          heading={"Error"}
          message={error?.response?.data?.error?.message?.toString()}
        />,
        ToastContent.Config
      );
    }
    toggleDeleteModal();
  };

  console.log(data);

  return (
    <>
      <p onClick={toggle} style={{ cursor: "pointer" }}>
        Edit
      </p>
      <ConfirmDeleteModal
        visibility={visibilityDeleteModal}
        toggle={toggleDeleteModal}
        onDelete={handleDelete}
        isLoading={isLoading}
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
