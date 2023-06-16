import { Modal, ModalBody, Spinner, ModalHeader } from "reactstrap";
import useToggle from "../../utility/hooks/useToggle";
import usePromoteUser from "../../hooks/mutations/users/usePromoteUser";
import { levels } from "../../data/Levels";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";

export type PromoteStudentModalProps = {
  data: any;
  studentLevel: "1" | "2";
};

export default function PromoteStudentModal({
  data,
  studentLevel,
}: PromoteStudentModalProps) {
  const [isOpen, toggle] = useToggle();
  const id = data?.id;

  const { isLoading, mutate } = usePromoteUser();
  const applicationData = [
    {
      title: "Name",
      value: `${data?.user?.firstName} ${data?.user?.lastName}`,
    },
    { title: "Fee Payment", value: data?.feePayment?.status },
    { title: "Initial Payment", value: data?.initialPayment?.status },
    { title: "Campus", value: data?.campus?.name },
    { title: "Session", value: data?.session?.name },
    { title: "Level", value: data?.level?.name },
    {
      title: "Application Date",
      value: new Date(data?.createdAt)?.toDateString(),
    },
  ];

  function accept() {
    //   <ToastContent
    //     heading={"Application Approved!"}
    //     message={`You have successfully approved ${data?.firstName} ${data?.lastName}'s application `}
    //     type={"success"}
    //   />

    const promoteTo = studentLevel === "1" ? "LEVEL_2" : "LEVEL_3";

    mutate(
      { level: promoteTo as any, userId: data?.id },
      {
        onSuccess: () => {
          toast.success(
            <ToastContent
              heading={"Student Promoted!"}
              message={`You have successfully promoted ${data?.firstName} ${data?.lastName} to ${promoteTo} `}
              type={"success"}
            />
          );
          toggle();
        },
        onError: (e: any) => handleError(e),
      }
    );
  }

  return (
    <>
      <u
        style={{
          cursor: "pointer",
        }}
        onClick={toggle}
      >
        Promote
      </u>

      {/* Modal */}
      <Modal centered {...{ isOpen, toggle }}>
        <ModalHeader {...{ toggle }}>Promote Student</ModalHeader>
        <ModalBody>
          {isLoading && <Spinner />}
          {applicationData?.map((d) => {
            return (
              <article
                key={d?.title}
                style={{
                  backgroundColor: "rgba(0, 45, 107, 0.07)",
                }}
                className="p-3 mb-3  d-flex align-items-center justify-content-between"
              >
                <div>
                  <p>{d?.title}</p>
                  <h2 className="">{d?.value}</h2>
                </div>
              </article>
            );
          })}

          <div className="d-flex justify-content-between w-100">
            <button
              onClick={accept}
              className="btn success btn-blue-800 btn-lg "
            >
              Promote to{" "}
              {studentLevel === "1" ? "Certificate Holder" : "Graduate"}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
