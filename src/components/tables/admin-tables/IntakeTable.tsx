import { Spinner } from "reactstrap";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import NewSession from "../../modals/NewSession";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import useDeleteSession from "../../../hooks/mutations/classes/useDeleteSession";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import AddIntakeModal from "../../modals/AddIntakeModal";
import useDeleteIntake from "../../../hooks/mutations/classes/useDeleteIntake";
import useAllIntakes from "../../../hooks/queries/classes/useAllIntakes";

interface Props {
  data: any;
  onCreate?: VoidFunction;
}

function ModifyIntake({ data, onCreate }: Props) {
  const [visibility, toggle] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const defaultValues = {
    name: data?.name,
    session: data?.session,
    startDate: new Date(data?.startDate).toDateString(),
    endDate: new Date(data?.endDate).toDateString(),
    isActive: data?.isActive,
    id: data?.id,
  };
  console.log(defaultValues?.id);

  const deleteMutation = useDeleteIntake(defaultValues?.id as string);
  const isLoading = deleteMutation?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Intake Deleted successfully"}
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
      <AddIntakeModal {...{ visibility, toggle, defaultValues, onCreate }} />
    </>
  );
}

export default function IntakeTable() {
  const { data: intakeData, isLoading, refetch } = useAllIntakes();
  const data = intakeData?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Intake",
      title: "Intake",
      render: (data) => {
        return <p>{data?.name}</p>;
      },
    },
    {
      key: "Session",
      title: "Session",
      render: (data) => <p>{data?.session.name}</p>,
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
        console.log(data);

        return (
          <div className="d-flex gap-3">
            <ModifyIntake onCreate={refetch} data={data} />
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
