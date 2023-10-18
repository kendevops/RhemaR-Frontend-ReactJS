import { Spinner } from "reactstrap";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import useAllTranscripts from "../../../hooks/queries/classes/useAllTranscripts";
import useDeleteTranscript from "../../../hooks/mutations/classes/useDeleteTranscript";
import TranscriptModal from "../../modals/TranscriptModal";

interface Props {
  data: any;
  onCreate?: VoidFunction;
}

function ModifyTranscript({ data, onCreate }: Props) {
  const [visibility, toggle] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const defaultValues = {
    level: data?.lavel?.name,
    type: data?.type,
    comment: data?.comment,
    city: data?.address?.city,
    street: data?.address?.street,
    state: data?.address?.state,
    country: data?.address?.country,
    zipCode: data?.address?.zipCode,
  };

  const deleteMutation = useDeleteTranscript(data?.id as string);
  const isLoading = deleteMutation?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Transcript Request Deleted successfully"}
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

      <TranscriptModal {...{ visibility, toggle, defaultValues, onCreate }} />
    </>
  );
}

export default function TranscriptTable() {
  // const { data: intakeData, isLoading, refetch } = useAllIntakes();
  const { data: transcriptData, isLoading, refetch } = useAllTranscripts();
  const data = transcriptData?.nodes;

  console.log(transcriptData?.nodes);

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
            <ModifyTranscript onCreate={refetch} data={data} />
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
