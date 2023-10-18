import { Spinner } from "reactstrap";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import AddIntakeModal from "../../modals/AddIntakeModal";
import useDeleteIntake from "../../../hooks/mutations/classes/useDeleteIntake";
import useAllIntakes from "../../../hooks/queries/classes/useAllIntakes";
import useAllClearance from "../../../hooks/queries/classes/useAllClearance";
import useAllCardReplacement from "../../../hooks/queries/classes/useAllCardReplacement";
import useDeleteCardReplacement from "../../../hooks/mutations/classes/useDeleteCardReplacement";
import CareReplacementModal from "../../modals/CardReplacementModal";
import CardReplacementModal from "../../modals/CardReplacementModal";

interface Props {
  data: any;
  onCreate?: VoidFunction;
}

function ModifyCardReplacement({ data, onCreate }: Props) {
  const [visibility, toggle] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const defaultValues = {
    level: data?.lavel?.name,
  };

  const deleteMutation = useDeleteCardReplacement(data?.id as string);
  const isLoading = deleteMutation?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Card Replacement Request Deleted successfully"}
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
      toggleDeleteModal();
    }
  };

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

      <CardReplacementModal
        {...{ visibility, toggle, defaultValues, onCreate }}
      />
    </>
  );
}

export default function CardReplacementTable() {
  // const { data: intakeData, isLoading, refetch } = useAllIntakes();
  const {
    data: cardReplacementData,
    isLoading,
    refetch,
  } = useAllCardReplacement();
  const data = cardReplacementData?.nodes;

  console.log(cardReplacementData?.nodes);

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "First Name",
      title: "First Name",
      render: (data) => {
        return <p>{data?.user?.firstName}</p>;
      },
    },
    {
      key: "Last Name",
      title: "Last Name",
      render: (data) => {
        return <p>{data?.user?.lastName}</p>;
      },
    },
    {
      key: "Payment Status",
      title: "Payment Status",
      render: (data) => <p>{data?.payment?.status}</p>,
    },

    {
      key: " Status",
      title: " Status",
      render: (data) => <p>{data?.status}</p>,
    },
    {
      key: "Date Applied",
      title: "Date Applied",
      render: (data) => (
        <p>{new Date(data?.payment?.createdAt).toDateString()}</p>
      ),
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log(data);

        return (
          <div className="d-flex gap-3">
            <ModifyCardReplacement onCreate={refetch} data={data} />
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
