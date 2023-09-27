import { Spinner } from "reactstrap";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import parseRole from "../../../utils/parseRole";
import ViewCampus from "../../modals/ViewCampusDetails";
import EditCampusModal from "../../modals/editModals/EditCampusModal";
import useDeleteCampus from "../../../hooks/mutations/classes/useDeleteCampus";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { useState } from "react";

type CampusesTableProps = {
  setShowCampusDetail: any;
  toggle: VoidFunction;
};

const DeleteCampus = (id: any, refetch: any) => {
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteIt = useDeleteCampus(id?.id);

  console.log(id?.id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteIt.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Campus deleted successfully"}
        />,
        ToastContent.Config
      );
      toggleDeleteModal();
      refetch();
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
    <ConfirmDeleteModal
      visibility={visibilityDeleteModal}
      toggle={toggleDeleteModal}
      onDelete={() => handleDelete()}
      isLoading={isDeleteLoading}
    />
  );
};

export default function CampusesTable2({
  setShowCampusDetail,
  toggle,
}: CampusesTableProps) {
  const { isLoading, data, refetch } = useAllCampuses();
  const campusesData = data?.nodes;

  console.log(campusesData);

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
      render: (data) => (
        <p>
          {data?.levels?.map(
            (r: any, i: number) =>
              `${parseRole(r?.name).split("Level")[1]}${
                i === data?.levels?.length - 1 ? "" : ", "
              }`
          )}
        </p>
      ),
    },
    {
      key: "Campus Cordinator",
      title: "Campus Cordinator",
      render: (data) => (
        <p>{`${data?.campusCoordinator?.firstName} ${data?.campusCoordinator?.lastName}`}</p>
      ),
    },
    {
      key: "Address",
      title: "Address",
      render: (data) => (
        <p>{`${data?.address?.city} ${data?.address?.state} ${data?.address?.country}`}</p>
      ),
    },
    {
      key: "View",
      title: "View",
      render: (data) => <ViewCampus data={data} />,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log(data);

        return (
          <div className="d-flex gap-4 ">
            <EditCampusModal data={data} onCreate={refetch} />
            <DeleteCampus id={data.id} refetch={refetch} />
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
