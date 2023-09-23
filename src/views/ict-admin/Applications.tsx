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
import FilterModal, { FilterProps } from "../../components/modals/FilterModal";
import { useEffect, useState } from "react";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import TableProfilePicture from "../../components/general/tableProfilePic";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { Icon } from "@iconify/react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import { MdOutlineCancel } from "react-icons/md";

interface ViewApplicationProps {
  status?: any;
  data: any;
  refetch: VoidFunction;
}

type FiltersProps = {
  campus?: string;
  applicationDateFrom?: string;
  applicationDateTo?: string;
  intake?: string;
  session?: string;
  status?: string;
};

function ViewApplicationModal({ data, status, refetch }: ViewApplicationProps) {
  const [isOpen, toggle] = useToggle();
  const id = data?.id;

  const approveApplication = useAcceptApplication(id, data?.level?.name);
  const rejectApplication = useRejectApplication(id, data?.level?.name);
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
            message={`You have successfully approved ${data?.user?.firstName} ${data?.user?.lastName}'s application `}
            type={"success"}
          />,
          { ...ToastContent.Config }
        );
        toggle();
        refetch();
      },
      onError: (e: any) => {
        console.log(e);

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
            message={`You have successfully rejected ${data?.user?.firstName} ${data?.user?.lastName}'s application `}
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

  return (
    <>
      <u
        style={{
          cursor: "pointer",
        }}
        onClick={toggle}
      >
        <FaRegEye style={{ cursor: "pointer", fontSize: "23px" }} />
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
  const [filters, setFilters] = useState<FiltersProps>({});
  const [filtering, setFiltering] = useState(false);
  const [isFiltering, toggleFiltering] = useToggle();
  const { data, isLoading, refetch } = useApplications(
    filtering ? filters : {}
  );
  const { data: sessionsData } = useAcademicSessions();

  const { data: campusesData } = useAllCampuses();
  const { data: userData, isLoading: userLoading } = useCurrentUser();

  // useEffect(()=>{
  //   const { data, isLoading, refetch } = useApplications(filters);
  // },[])

  console.log(userData);

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const { data: intakeData } = useAllIntakes();
  const intakeDataOptions = intakeData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  // const intakeOptions = ["April", "November"].map((v) => ({
  //   children: v + " intake",
  // }));

  const sessionOptions = sessionsData?.nodes?.map((sess: any) => ({
    children: sess?.name,
  }));

  console.log(data?.nodes);

  const filterProps: FilterProps = {
    params: [
      {
        inputType: "Dropdown",
        inputProps: {
          options: campusOptions,
        },
        id: "campus",
        name: "Campus",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: intakeDataOptions,
        },
        id: "intake",
        name: "Intake",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: sessionOptions,
        },
        id: "session",
        name: "Session",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "applicationDateFrom",
        name: "Application Date (From)",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "applicationDateTo",
        name: "Application Date (To)",
      },

      {
        inputType: "Dropdown",
        inputProps: {
          options: [
            { children: "APPROVED" },
            { children: "PENDING" },
            { children: "DEFERRED" },
          ],
        },
        id: "status",
        name: "Status",
      },
    ],
    isOpen: isFiltering,
    onFilter: (params: any) => {
      setFilters({
        intake: params?.intake,
        campus: params?.campus,
        session: params?.session,
        status: params?.status,
        applicationDateFrom: params?.applicationDateFrom
          ? params?.applicationDateFrom
          : null,
        applicationDateTo: params?.applicationDateTo
          ? params?.applicationDateTo
          : null,
      });
      console.log(params);

      refetch();
      setFiltering(true);
      console.log(data);
      toggleFiltering();
    },
    toggle: toggleFiltering,
  };

  return (
    <section>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>New Intake Applications</div>

        {filtering && (
          <div
            className=" bg-white "
            style={{ width: "2px", height: "20px" }}
          ></div>
        )}

        {filtering && <div>Filtered List</div>}
      </div>

      {filtering && (
        <div className="d-flex gap-4 ">
          {filters?.campus && (
            <p
              className="d-flex gap-3 py-3 px-4 rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.campus}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.session && (
            <p
              className="d-flex gap-3 py-3 px-4 rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.session}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.applicationDateFrom && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.applicationDateFrom}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.applicationDateTo && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.applicationDateTo}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.intake && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.intake}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.status && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.status}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}
        </div>
      )}

      {isLoading && <Spinner />}
      <FilterModal {...filterProps} />

      <article className="d-flex gap-5 m-5" id="Search">
        <div style={{ flex: 1 }}>
          <SearchBar />
        </div>
        <div
          className="d-flex gap-3 justify-content-end"
          style={{
            flex: 1,
          }}
        >
          <button
            className="btn btn-outline-info btn-lg "
            style={{ width: "fit-content" }}
            onClick={() => {
              toggleFiltering();
              setFiltering(false);
              setFilters({});
            }}
          >
            Filter
          </button>
        </div>
      </article>
      {data && (
        <Table.Wrapper>
          {/* Table */}
          <Table
            data={data?.nodes}
            columns={[
              {
                key: "Serial number",
                title: "S/N",
                render: (data, i) => {
                  console.log(data);

                  return <p>{i}</p>;
                },
              },
              {
                key: "Pic",
                title: "Pic",
                render: (data, i) => <TableProfilePicture />,
              },

              {
                key: "First Name",
                title: "First Name",
                render: (d) => <p>{d?.user?.firstName}</p>,
              },
              {
                key: "Middle Name",
                title: "Middle Name",
                render: (d) => <p>{d?.user?.middleName}</p>,
              },
              {
                key: "Last Name",
                title: "Last Name",
                render: (d) => <p>{d?.user?.lastName}</p>,
              },
              {
                key: "Gender",
                title: "Gender",
                render: (d) => <p>{"Not Provided"}</p>,
              },

              {
                key: "Campus",
                title: "Campus",
                render: (d) => <p>{d?.campus?.name}</p>,
              },

              {
                key: "Intake",
                title: "Intake",
                render: (d) => <p>{d?.intake?.name}</p>,
              },

              {
                key: "applicationFee",
                title: "Application Fee",
                render: (d) => <p>{d?.feePayment?.status}</p>,
              },

              {
                key: "initialFee",
                title: "Initial Fee",
                render: (d) => <p>{d?.initialPayment?.status}</p>,
              },

              {
                key: "date",
                title: "Date Of Application",
                render: (d) => {
                  return <p>{new Date(d?.createdAt)?.toDateString()}</p>;
                },
              },

              {
                key: "status",
                title: "Status",
                render: (d) => <p>{d?.status}</p>,
              },

              {
                key: "action",
                title: "Action",
                render: (d) => (
                  <div className="d-flex gap-4">
                    <ViewApplicationModal
                      refetch={refetch}
                      status={d?.status}
                      data={d}
                    />

                    <RiDeleteBin6Line
                      style={{ cursor: "pointer", fontSize: "23px" }}
                    />
                  </div>
                ),
              },
            ]}
          />
        </Table.Wrapper>
      )}
    </section>
  );
}

// Here
