import { Fragment, useState } from "react";
import SearchBar from "../../components/general/searchBar";
import useAllUsers from "../../hooks/queries/useAllUsers";
import { Spinner } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table, { TableColumns } from "../../components/general/table/Table";
import parseRole from "../../utils/parseRole";
import useToggle from "../../utility/hooks/useToggle";
import FilterModal, { FilterProps } from "../../components/modals/FilterModal";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useRoles from "../../hooks/queries/useRoles";
import { FaFilter, FaRegEye } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { Icon } from "@iconify/react";
import { MdOutlineCancel } from "react-icons/md";
import useCourses from "../../hooks/queries/classes/useCourses";
import { Link } from "react-router-dom";
import AddCourseCoursesModal from "../../components/modals/AddCourseScheduleModal";
import UploadBulkCourseScheduleModal from "../../components/modals/UploadBulkCourseScheduleModal";
import UploadBulkCourseModal from "../../components/modals/UploadBulkCourseModal";
import AddCoreCourseModal from "../../components/modals/AddCourseModal";

type FiltersProps = {
  level?: string;
  elective?: string;
  hours?: string;
};

export default function CourseManagement() {
  const [filters, setFilters] = useState<FiltersProps>({});
  const [filtering, setFiltering] = useState(false);
  const { data, isLoading } = useAllUsers(filters);
  const { data: campusesData } = useAllCampuses();
  const { data: rolesData } = useRoles();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const courses = coursesData?.courses;

  console.log(courses, coursesData);

  console.log(filters);

  const [isFiltering, toggleFiltering] = useToggle();
  const [isAdding, toggleAdding] = useToggle();
  const [isBulkUploadOpen, toggleBulkUpload] = useToggle();

  const usersData = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("ADMIN"));
  });

  const ssData = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("STUDENT_SERVICES_ADMIN"));
  });

  console.log(ssData);

  console.log(usersData);

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));
  console.log(campusOptions);

  const roleOptions = rolesData?.roles?.map((d: any) => ({
    children: d?.name,
  }));

  const filterProps: FilterProps = {
    params: [
      {
        inputType: "Dropdown",
        inputProps: {
          options: ["Level 1", "Level 2", "Level 3"].map((d: any) => ({
            children: d,
          })),
        },
        id: "level",
        name: "Level",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: ["Core", "Option"].map((d: any) => ({
            children: d,
          })),
        },
        id: "elective",
        name: "Course Elective",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: ["12", "5", "10"].map((d: any) => ({
            children: d,
          })),
        },
        id: "hours",
        name: "Course Hours",
      },
    ],
    isOpen: isFiltering,
    onFilter: (params: any) => {
      setFilters(params);
      setFiltering(true);
    },
    toggle: toggleFiltering,
  };

  function onSearch() {}

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },

    {
      key: "Course Instance",
      title: "Course",
      render: (data) => <p>Paul's Theology of Righteousness</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>2</p>,
    },
    {
      key: "Elective",
      title: "Elective",
      render: (data) => <p>Core</p>,
    },

    {
      key: "Hours",
      title: "Hours",
      render: (data) => <p>12 hours</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log("usersData", data);
        return (
          <div className="d-flex gap-4">
            <Link to={`/student-services-admin/course-details`}>
              <FaRegEye style={{ cursor: "pointer", fontSize: "23px" }} />
            </Link>
            <RiDeleteBin6Line style={{ cursor: "pointer", fontSize: "23px" }} />
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div id="Modals">
        <FilterModal {...filterProps} />
        <AddCoreCourseModal visibility={isAdding} toggle={toggleAdding} />
        <UploadBulkCourseModal
          isOpen={isBulkUploadOpen}
          toggle={toggleBulkUpload}
        />
      </div>

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Management</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>

        <div>User Campus</div>

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
          {filters?.level && (
            <p
              className="d-flex gap-3 py-3 px-4 rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.level}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.elective && (
            <p
              className="d-flex gap-3 py-3 px-4 rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.elective}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.hours && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.hours}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}
        </div>
      )}

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
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleBulkUpload}
          >
            Bulk Upload
          </button>
          <button
            className="border-800-blue border-2 btn-lg "
            style={{ width: "fit-content" }}
            onClick={toggleFiltering}
          >
            <FaFilter /> Filter Courses
          </button>

          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleAdding}
          >
            Add Course
          </button>
        </div>
      </article>

      <main id="Table">
        {isLoading && <Spinner />}
        <Table.Wrapper>
          {usersData && <Table columns={columns} data={usersData} />}
        </Table.Wrapper>
      </main>
    </Fragment>
  );
}
