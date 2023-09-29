import { Link } from "react-router-dom";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import Table, { TableColumns } from "../../general/table/Table";
import { Spinner } from "reactstrap";
import ToastContent from "../../molecules/ToastContent";
import { toast } from "react-toastify";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import useToggle from "../../../utility/hooks/useToggle";
import EditCoreCoursesModal from "../../modals/editModals/EditCoreCoursesModal";
import useDeleteCourses from "../../../hooks/mutations/classes/useDeleteCourses";
import useDeleteCourseSection from "../../../hooks/mutations/classes/useDeleteCourse";

const DeleteCoreCourse = (id: any) => {
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteIt = useDeleteCourses(id);
  // const deleteIt2 = useDeleteCourseSection(id);

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

export default function AcademicCoreCoursesTable() {
  const { data: coursesData, isLoading } = useAllCourses();
  const data = coursesData?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i}</p> },
    {
      key: "Course",
      title: "Course",
      render: (data) => <p style={{ width: "300px" }}>{"Course Nmae"}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{"LEVEL_1"}</p>,
    },
    {
      key: "Option",
      title: "Option",
      render: (data) => <p>{"Core"}</p>,
    },

    {
      key: "Hour",
      title: "Hour",
      render: (data) => <p>{12}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        return (
          <div className="d-flex gap-3">
            <EditCoreCoursesModal data={data} />
            <DeleteCoreCourse id={data.id} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table.Wrapper>
        {isLoading && <Spinner />}
        <Table columns={columns} data={data} />
      </Table.Wrapper>
    </>
  );
}
