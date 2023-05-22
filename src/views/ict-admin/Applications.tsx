import { Spinner } from "reactstrap";
import SearchBar from "../../components/general/searchBar";
import Table from "../../components/general/table/Table";
import useApplications from "../../hooks/queries/applications/useApplications";
import useToggle from "../../utility/hooks/useToggle";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useAcceptApplication from "../../hooks/mutations/applications/useAcceptApplication";
import useRejectApplication from "../../hooks/mutations/applications/useRejectApplication";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";

interface ViewApplicationProps {
  status?: any;
  data: any;
  refetch: VoidFunction;
}

function ViewApplicationModal({ data, status, refetch }: ViewApplicationProps) {
  const [isOpen, toggle] = useToggle();
  const id = data?.id;

  const approveApplication = useAcceptApplication(id);
  const rejectApplication = useRejectApplication(id);
  const isLoading =
    approveApplication?.isLoading || rejectApplication?.isLoading;

  const isApproved = status === "APPROVED";

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
    approveApplication.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            heading={"Application Approved!"}
            message={`You have successfully approved ${data?.firstName} ${data?.lastName}'s application `}
            type={"success"}
          />,
          { ...ToastContent.Config }
        );
        toggle();
        refetch();
      },
      onError: (e: any) => {
        handleError(e);
      },
    });
  }

  function reject() {
    rejectApplication.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            heading={"Application Rejected"}
            message={`You have successfully rejected ${data?.firstName} ${data?.lastName}'s application `}
            type={"success"}
          />,
          { ...ToastContent.Config }
        );
        toggle();
      },
      onError: (e: any) => {
        handleError(e);
      },
    });
  }

  return (
    <>
      <u
        style={{
          cursor: "pointer",
        }}
        onClick={toggle}
      >
        View Application
      </u>

      {/* Modal */}
      <Modal centered {...{ isOpen, toggle }}>
        <ModalHeader {...{ toggle }}>View Application</ModalHeader>
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
          {!isApproved && (
            <div className="d-flex justify-content-between">
              <button
                onClick={reject}
                className="btn danger btn-red-800 btn-lg w-25"
              >
                Reject
              </button>
              <button
                onClick={accept}
                className="btn success btn-blue-800 btn-lg w-25"
              >
                Approve
              </button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default function Applications() {
  const { data, isLoading, refetch } = useApplications();

  return (
    <section>
      {isLoading && <Spinner />}

      <div className="my-4 w-75 mx-auto">
        <SearchBar />
      </div>

      {data && (
        <Table.Wrapper>
          {/* Table */}
          <Table
            data={data?.nodes}
            columns={[
              {
                key: "name",
                title: "Name",
                render: (d) => (
                  <p>
                    {d?.user?.firstName} {d?.user?.lastName}
                  </p>
                ),
              },
              {
                key: "state",
                title: "State",
                render: (d) => <p>{d?.address?.state ?? "Not Provided"}</p>,
              },
              {
                key: "status",
                title: "Status",
                render: (d) => <p>{d?.status}</p>,
              },
              {
                key: "initialPayment",
                title: "Initial Payment",
                render: (d) => <p>{d?.initialPayment?.status}</p>,
              },
              {
                key: "date",
                title: "Date",
                render: (d) => {
                  return <p>{new Date(d?.createdAt)?.toDateString()}</p>;
                },
              },
              {
                key: "feePayment",
                title: "Fee Payment",
                render: (d) => <p>{d?.feePayment?.status}</p>,
              },
              {
                key: "action",
                render: (d) => (
                  <ViewApplicationModal
                    refetch={refetch}
                    status={d?.status}
                    data={d}
                  />
                ),
              },
            ]}
          />
        </Table.Wrapper>
      )}
    </section>
  );
}
