import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import StudentsList from "../../components/lists/students-list/index";
import StudentsTable from "../../components/tables/students-table/index";
import userRoles from "../../utility/userRoles";
import Tab from "../../components/atoms/Tab";
import useAllUsers from "../../hooks/queries/useAllUsers";
import Table, { TableColumns } from "../../components/general/table/Table";
import { Spinner } from "reactstrap";
import PromoteStudentModal from "../../components/modals/PromoteStudentModal";
import SearchBar from "../../components/general/searchBar";
import FilterModal, { FilterProps } from "../../components/modals/FilterModal";
import useToggle from "../../utility/hooks/useToggle";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import Papa from "papaparse";
import useUploadUsers from "../../hooks/mutations/users/useUploadUsers";
import handleError from "../../utils/handleError";
import { RiDeleteBin6Line } from "react-icons/ri";
import TableProfilePicture from "../../components/general/tableProfilePic";
import { FaRegEye } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useApplications from "../../hooks/queries/applications/useApplications";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import ExportStudentsFirstModal from "../../components/modals/ExportStudentsFirstModal";
import UploadBulkStudentModal from "../../components/modals/UploadBulkStudentApplicationModal";
import { AiOutlineCaretDown } from "react-icons/ai";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import AddstudentApplicationModal from "../../components/modals/AddStudentApplicationModal";
import UploadBulkStudentApplicationModal from "../../components/modals/UploadBulkStudentApplicationModal";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import AddStudentModal from "../../components/modals/AddStudentModal";

const Options = [
  {
    title: "All",
  },
  {
    title: "Prospective students",
    role: userRoles.PROSPECTIVE_STUDENT,
  },
  {
    title: "Level 1 students",
    role: `${userRoles.STUDENT}`,
    level: "LEVEL_1",
  },
  {
    title: "Level 2 students",
    role: `${userRoles.STUDENT}`,
    level: "LEVEL_2",
  },
];

const CampusCoordinatorStudents = () => {
  const [isExporting, toggleExport] = useToggle();
  const [isAdding, toggleAdding] = useToggle();
  const [isBulkUploadOpen, toggleBulkUpload] = useToggle();

  const [isFiltering, toggleFiltering] = useToggle();
  const [filters, setFilters] = useState<any>(null);
  const [addStudentDropDown, setAddStudentDropDown] = useState(false);

  const { data, isLoading, refetch } = useAllUsers(filters);
  const users = data?.users?.nodes;
  // const { data: userData, isLoading: userLoading } = useCurrentUser();

  const studentsData = users
    ? users?.filter((user: any) => user?.roles[0]?.name === userRoles.STUDENT)
    : [];

  // const { data, isLoading, refetch } = useApplications();

  // const approvedStudentsData = data?.nodes?.filter(
  //   (d: any, i: number) => d.status === "APPROVED"
  // );

  // console.log(approvedStudentsData);

  const { data: campusesData } = useAllCampuses();
  const { data: sessionsData } = useAcademicSessions();

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const { data: intakeData } = useAllIntakes();
  const intakeDataOptions = intakeData?.nodes
    ?.filter((d: any) => d?.session?.isActive)
    ?.map((d: any) => d?.name)
    ?.map((v: string) => ({
      children: v,
    }));

  console.log(intakeDataOptions);

  const levelOptions = ["LEVEL_1", "LEVEL_2", "LEVEL_3", "LEVEL_4"].map(
    (v) => ({
      children: v,
    })
  );

  const sessionOptions = sessionsData?.nodes?.map((sess: any) => ({
    children: sess?.name,
  }));

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
          options: levelOptions,
        },
        id: "level",
        name: "Level",
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
        inputType: "Dropdown",
        inputProps: {
          options: intakeDataOptions,
        },
        id: "intake",
        name: "Intake",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "text",
        },
        id: "noOfClassDone",
        name: "No of Class Done",
      },
      // {
      //   inputType: "Dropdown",
      //   inputProps: {
      //     options: [{ children: "Paid" }, { children: "Pending" }],
      //   },
      //   id: "paymentStatus",
      //   name: "Payment Status",
      // },
    ],
    isOpen: isFiltering,
    onFilter: (params: any) => {
      setFilters(params);
    },
    toggle: toggleFiltering,
  };

  return (
    <>
      <div id="Modals">
        <FilterModal {...filterProps} />
        <ExportStudentsFirstModal isOpen={isExporting} toggle={toggleExport} />

        <AddStudentModal isOpen={isAdding} toggle={toggleAdding} />
        <UploadBulkStudentModal
          isOpen={isBulkUploadOpen}
          toggle={toggleBulkUpload}
          refetch={refetch}
        />
      </div>

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Student Management</div>
      </div>

      <article className="d-flex gap-5 my-5" id="Search">
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
            style={{ width: "fit-content", height: "50px" }}
            onClick={toggleFiltering}
          >
            Filter
          </button>

          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content", height: "50px" }}
            onClick={toggleExport}
          >
            Export
          </button>

          <div
            className=""
            // style={{
            //   height: `${addStudentDropDown ? "150px" : ""}`,
            // }}
          >
            <button
              className="btn btn-blue-800 btn-lg mb-3 "
              style={{ width: "fit-content" }}
              onClick={() => setAddStudentDropDown(() => !addStudentDropDown)}
            >
              Add students <AiOutlineCaretDown className="mx-3" />
            </button>

            {addStudentDropDown && (
              <div
                className="position-absolute d-flex gap-3 flex-column z-3 bg-white p-3"
                // style={{ width: "200px" }}
              >
                <button
                  className="btn btn-blue-800 btn-lg"
                  style={{ minWidth: "100%" }}
                  onClick={toggleAdding}
                >
                  Add single student
                </button>

                <button
                  className="btn btn-blue-800 btn-lg"
                  style={{ minWidth: "100%" }}
                  onClick={toggleBulkUpload}
                >
                  Bulk upload students
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Table */}
      <Table.Wrapper>
        {isLoading && <Spinner />}
        {data && (
          <Table
            columns={[
              {
                key: "Serial number",
                title: "S/N",
                render: (data, i) => <p>{i + 1}</p>,
              },
              {
                key: "Pic",
                title: "Pic",
                render: (data, i) => <TableProfilePicture />,
              },

              {
                key: "First Name",
                title: "First Name",
                render: (d) => <p>{d?.firstName}</p>,
              },

              {
                key: "Last Name",
                title: "Last Name",
                render: (d) => <p>{d?.lastName}</p>,
              },
              {
                key: "Level",
                title: "Level",
                render: (d) => <p>{d?.level?.name}</p>,
              },

              {
                key: "Campus",
                title: "Campus",
                render: (d) => <p>{d?.campus?.name}</p>,
              },

              {
                key: "Intake",
                title: "Intake",
                render: (d) => <p>{d?.intake ?? "Not Provided"}</p>,
              },
              {
                key: "Gender",
                title: "Gender",
                render: (d) => <p>{d?.gender}</p>,
              },

              {
                key: "LastClass",
                title: "Last Class",
                render: (d) => {
                  console.log(d);

                  return <p>{new Date(d?.createdAt)?.toDateString()}</p>;
                },
              },

              {
                key: "action",
                title: "Action",
                render: (d) => (
                  <div className="d-flex gap-4">
                    <Link to={`/student-services-admin/${d?.id}`}>
                      <FaRegEye
                        style={{ cursor: "pointer", fontSize: "23px" }}
                      />
                    </Link>

                    <RiDeleteBin6Line
                      style={{ cursor: "pointer", fontSize: "23px" }}
                    />
                  </div>
                ),
              },
            ]}
            data={studentsData}
          />
        )}
      </Table.Wrapper>
    </>
  );
};

export default CampusCoordinatorStudents;
