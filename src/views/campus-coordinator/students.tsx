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
import AddStudentModal from "../../components/modals/AddStudentModal";
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
  const [isAdding, toggleAdding] = useToggle();
  const [isExporting, toggleExport] = useToggle();

  const [isFiltering, toggleFiltering] = useToggle();
  const [filters, setFilters] = useState<any>(null);
  // const { data: userData, isLoading, refetch } = useAllUsers(filters);
  // const data = userData?.users?.nodes;
  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const { data, isLoading, refetch } = useApplications();

  const approvedStudentsData = data?.nodes?.filter(
    (d: any, i: number) => d.status === "APPROVED"
  );

  console.log(approvedStudentsData);

  const { data: campusesData } = useAllCampuses();
  const { data: sessionsData } = useAcademicSessions();

  const { isLoading: isUploading, mutate } = useUploadUsers();

  const importHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const data: any = results?.data;
        console.log(data);
        mutate(
          { users: data?.map((d: any) => ({ ...d, roles: [d?.roles] })) },
          {
            onSuccess: () => {
              alert("Upload successful!");
              refetch();
            },
            onError: (e) => handleError(e),
          }
        );
      },
    });
  };

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const intakeOptions = ["April", "November"].map((v) => ({
    children: v + " intake",
  }));

  const levelOptions = ["LEVEL_1", "LEVEL_2"].map((v) => ({
    children: v,
  }));

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
          options: intakeOptions,
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
      {
        inputType: "Dropdown",
        inputProps: {
          options: [{ children: "Paid" }, { children: "Pending" }],
        },
        id: "paymentStatus",
        name: "Payment Status",
      },
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
        <AddStudentModal isOpen={isAdding} toggle={toggleAdding} />
        <ExportStudentsFirstModal isOpen={isExporting} toggle={toggleExport} />
      </div>

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Student Management</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.campus?.name}`}</div>
      </div>

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
            onClick={toggleFiltering}
          >
            Filter
          </button>
          <div>
            <label
              htmlFor="upload"
              className="btn btn-outline-info btn-lg "
              style={{ width: "fit-content" }}
            >
              Import
            </label>
            <input
              id="upload"
              type="file"
              name="file"
              accept=".csv"
              onChange={importHandler}
              hidden
            />
          </div>
          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleExport}
          >
            Export
          </button>
          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleAdding}
          >
            Add student
          </button>
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
                render: (data, i) => <p>{i}</p>,
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
                key: "Last Name",
                title: "Last Name",
                render: (d) => <p>{d?.user?.lastName}</p>,
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
                render: (d) => <p>{d?.gender ?? "Not Provided"}</p>,
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
            data={approvedStudentsData}
          />
        )}
      </Table.Wrapper>
    </>
  );
};

export default CampusCoordinatorStudents;
