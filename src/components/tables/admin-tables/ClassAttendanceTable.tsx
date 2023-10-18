import { Spinner } from "reactstrap";
import useAllExams from "../../../hooks/queries/classes/useAllExams";
import useToggle from "../../../utility/hooks/useToggle";
import Table from "../../general/table/Table";
import CreateExamModal from "../../modals/CreateExamModal";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import handleError from "../../../utils/handleError";
import useDeleteExam from "../../../hooks/mutations/classes/useDeleteExam";
import useAllClassesAttendance from "../../../hooks/queries/classes/useAllClassAttendance";
import AddClassAttendanceModal from "../../modals/AddClassAttentanceModal";
import useDeleteClassAttendance from "../../../hooks/mutations/classes/useDeleteClassAttendance";

type EditClassAttandanceProps = {
  data: any;
  refetch: any;
};

function EditClassAttandance({ data, refetch }: EditClassAttandanceProps) {
  const [isEditing, toggleEditing] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const id = data?.id;

  const deleteIt = useDeleteClassAttendance(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Attendance deleted successfully`}
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
    <>
      <AddClassAttendanceModal
        defaultValues={data}
        visibility={isEditing}
        toggle={toggleEditing}
        onCreate={refetch}
      />

      <u onClick={toggleEditing}>Edit</u>
      <ConfirmDeleteModal
        visibility={visibilityDeleteModal}
        toggle={toggleDeleteModal}
        onDelete={() => handleDelete()}
        isLoading={isDeleteLoading}
      />
    </>
  );
}

export default function ClassAttendanceTable() {
  const { data: examsData, isLoading, refetch } = useAllClassesAttendance();
  const data = examsData?.nodes;

  console.log(data);

  return (
    <>
      <Table.Wrapper>
        {isLoading && <Spinner />}
        {data && (
          <Table
            data={data}
            columns={[
              {
                key: "Serial number",
                title: "S/N",
                render: (data, i) => <p>{i + 1}</p>,
              },
              {
                key: "User",
                title: "User",
                render: (d) => (
                  <p>{`${d?.user?.firstName} ${d?.user?.lastName}`}</p>
                ),
              },
              {
                key: "Class Name",
                title: "Class Name",
                render: (d) => <p>{d?.class?.name}</p>,
              },
              {
                key: "Course",
                title: "Course",
                render: (d) => <p>{d?.class?.course?.name}</p>,
              },
              {
                key: "Level",
                title: "Level",
                render: (d) => <p>{d?.class?.course?.level?.name}</p>,
              },
              {
                key: "Attendance Method",
                title: "Attendance Method",
                render: (d) => <p>{d?.attendanceMethod}</p>,
              },

              {
                key: "Action",
                title: "Action",
                render: (d) => {
                  console.log(d);

                  return (
                    <div className="d-flex gap-4 align-items-center ">
                      <EditClassAttandance data={d} refetch={refetch} />
                      {/* <u onClick={handleDelete}>Delete</u> */}
                    </div>
                  );
                },
              },
            ]}
          />
        )}
      </Table.Wrapper>
    </>
  );
}
