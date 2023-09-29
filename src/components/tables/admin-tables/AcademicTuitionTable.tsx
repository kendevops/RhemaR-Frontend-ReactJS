import React from "react";
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
      render: (data) => <p>{data?.tuitions?.level?.name?.split("_")[1]}</p>,
    },
    {
      key: "Application Fee",
      title: "Cost",
      render: (data) => <p>{data?.tuitions?.feePayment}</p>,
    },

    {
      key: "Initial Payment",
      title: "Cost",
      render: (data) => <p>{data?.tuitions?.initialPayment}</p>,
    },
    {
      key: "Installment Minimum",
      title: "Cost",
      render: (data) => <p>{data?.tuitions?.installmentMinimum}</p>,
    },
    {
      key: "Discount",
      title: "Cost",
      render: (data) => <p>{data?.tuitions?.discount}</p>,
    },
    {
      key: "Total",
      title: "Cost",
      render: (data) => <p>{data?.tuitions?.total}</p>,
    },

    {
      key: "Due Date",
      title: "Due Date",
      render: (data) => (
        <p>{new Date(data?.tuitions?.dueDate).toDateString()}</p>
      ),
    },

    // total: 130000,
    //     dueDate: '2022-11-23T13:24:00.417Z',
    //     discount: 10,
    //     feePayment: 10000,
    //     initialPayment: 20000,
    //     installmentMinimum: 10000,
    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log(data);

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
