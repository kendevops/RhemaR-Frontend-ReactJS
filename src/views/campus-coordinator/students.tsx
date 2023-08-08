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

const defaultColumnsData: any = [
  {
    key: "Name",
    title: "Name",
    render: (data: any) => <p>{data?.firstName + " " + data?.lastName}</p>,
  },
  {
    key: "Phone Number",
    title: "Phone Number",
    render: (data: any) => <p>{data?.phoneNumber}</p>,
  },
  {
    key: "Email",
    title: "Email",
    render: (data: any) => <p>{data?.email}</p>,
  },
];

const CampusCoordinatorStudents = () => {
  const [isAdding, toggleAdding] = useToggle();
  const [isFiltering, toggleFiltering] = useToggle();
  const [filters, setFilters] = useState<any>(null);
  const { data: userData, isLoading, refetch } = useAllUsers(filters);
  const data = userData?.users?.nodes;

  let columns: TableColumns<any>[] = [...defaultColumnsData];

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
          options: intakeOptions,
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
            onClick={toggleAdding}
          >
            Add student
          </button>
        </div>
      </article>

      {/* Table */}
      <Table.Wrapper>
        {isLoading && <Spinner />}
        {data && <Table columns={columns} data={data} />}
      </Table.Wrapper>
    </>
  );
};

export default CampusCoordinatorStudents;
