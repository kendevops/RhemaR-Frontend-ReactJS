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
import useAllCampusesTuitions from "../../../hooks/queries/classes/useAllCampusesTuitions";
import handleError from "../../../utils/handleError";

interface DeleteTuitionModalProps {
  data: any;
  refetch?: any;
}
const DeleteTuition = ({ data, refetch }: DeleteTuitionModalProps) => {
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const id = data?.id;

  const deleteIt = useDeleteTuition(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Tuition deleted successfully`}
          />,
          ToastContent.Config
        );
        refetch();

        toggleDeleteModal();
      },
      onError: (e: any) => {
        handleError(e);
        toggleDeleteModal();
      },
    });
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
  const { isLoading, data, refetch } = useAllCampusesTuitions();
  const campusesTuitiobsData = data?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Name",
      title: "Campus Name",
      render: (data) => <p>{data?.campus?.name}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{data?.level?.name?.split("_")[1]}</p>,
    },
    {
      key: "Application Fee",
      title: "Application Fee",
      render: (data) => <p>{data?.feePayment}</p>,
    },

    {
      key: "Initial Payment",
      title: "Initial Payment",
      render: (data) => <p>{data?.initialPayment}</p>,
    },
    {
      key: "Installment Minimum",
      title: "Installment Minimum",
      render: (data) => <p>{data?.installmentMinimum}</p>,
    },
    {
      key: "Discount",
      title: "Discount",
      render: (data) => <p>{data?.discount}</p>,
    },
    {
      key: "Total",
      title: "Total",
      render: (data) => <p>{data?.total}</p>,
    },

    {
      key: "Due Date",
      title: "Due Date",
      render: (data) => <p>{new Date(data?.dueDate).toDateString()}</p>,
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => {
        return (
          <div className="d-flex gap-3">
            <DeleteTuition data={data} refetch={refetch} />
            <EditTuitionModal data={data} refetch={refetch} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      <Table.Wrapper>
        {<Table columns={columns} data={campusesTuitiobsData} />}
      </Table.Wrapper>
    </>
  );
}
