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

type EditExamProps = {
  data: any;
  refetch: any;
};

function EditExam({ data, refetch }: EditExamProps) {
  const [isEditing, toggleEditing] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const id = data?.id;

  const deleteIt = useDeleteExam(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Exam deleted successfully`}
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
      <CreateExamModal
        defaultValues={data}
        isOpen={isEditing}
        toggle={toggleEditing}
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

export default function ExamsTable() {
  const { data: examsData, isLoading, refetch } = useAllExams();
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
              { key: "Name", title: "Name", render: (d) => <p>{d?.name}</p> },
              {
                key: "Course",
                title: "Course",
                render: (d) => <p>{d?.course?.name}</p>,
              },
              {
                key: "Session",
                title: "Session",
                render: (d) => <p>{d?.session?.name}</p>,
              },
              {
                key: "Duration",
                title: "Duration",
                render: (d) => <p>{d?.duration}mins</p>,
              },
              {
                key: "Date",
                title: "Date",
                render: (d) => (
                  <p>
                    {new Date(d?.startsAt)?.toDateString()} -{" "}
                    {new Date(d?.endsAt)?.toDateString()}{" "}
                  </p>
                ),
              },
              {
                key: "Action",
                title: "Action",
                render: (d) => {
                  return (
                    <div className="d-flex gap-4">
                      <EditExam data={d} refetch={refetch} />
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
