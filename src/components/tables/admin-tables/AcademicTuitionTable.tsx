import { Spinner } from "reactstrap";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import useDeleteTuition from "../../../hooks/mutations/classes/useDeleteTuition";
import EditTuitionModal from "../../modals/editModals/EditTuitionModal";

const DeleteTuition = (id: any) => {
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteIt = useDeleteTuition(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteIt.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Tuition deleted successfully"}
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

  return (
    <ConfirmDeleteModal
      visibility={visibilityDeleteModal}
      toggle={toggleDeleteModal}
      onDelete={() => handleDelete()}
      isLoading={isDeleteLoading}
    />
  );
};

export default function AcademicTuitionTable() {
  const { isLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Name",
      title: "Name",
      render: (data) => <p>{data?.name}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{2}</p>,
    },
    {
      key: "Cost",
      title: "Cost",
      render: (data) => <p>{30000}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        return (
          <div className="d-flex gap-3">
            <DeleteTuition />
            <EditTuitionModal data={data} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      <Table.Wrapper>
        {<Table columns={columns} data={campusesData} />}
      </Table.Wrapper>
    </>
  );
}
