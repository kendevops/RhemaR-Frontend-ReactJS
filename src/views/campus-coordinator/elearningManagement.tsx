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
import TableProfilePicture from "../../components/general/tableProfilePic";
import { FaFilter, FaRegEye } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { Icon } from "@iconify/react";
import { MdOutlineCancel } from "react-icons/md";
import useCourses from "../../hooks/queries/classes/useCourses";
import { Link } from "react-router-dom";

type FiltersProps = {
  campus?: string;
  role?: string;
  fromLoginDate?: string;
  toLoginDate?: string;
};

export default function ElearningManagement() {
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
  const [isEditing, toggleEditing] = useToggle();

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
          options: campusOptions,
        },
        id: "campus",
        name: "Campus",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: roleOptions,
        },
        id: "role",
        name: "Role",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "StartDate",
        name: "Start Date (From)",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "EndDate",
        name: "End Date (To)",
      },
    ],
    isOpen: isFiltering,
    onFilter: (params: any) => {
      setFilters(params);
    },
    toggle: toggleFiltering,
  };

  function onSearch() {}

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },

    {
      key: "Course",
      title: "Course",
      render: (data) => <p>Math Chemistry Physics</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>2</p>,
    },
    {
      key: "Audio",
      title: "Audio",
      render: (data) => <p>8</p>,
    },
    {
      key: "Video",
      title: "Video",
      render: (data) => <p>16</p>,
    },
    {
      key: "Instructor",
      title: "Instructor",
      render: (data) => <p>Dubem Luke</p>,
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
      </div>

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>ELearning Course Materails</div>

        {filters.campus && (
          <div
            className=" bg-white "
            style={{ width: "2px", height: "20px" }}
          ></div>
        )}

        {filters.campus && <div>Filtering</div>}
      </div>

      {filters.campus && (
        <div className="d-flex gap-4 ">
          <p
            className="d-flex gap-3 py-3 px-4 rounded-5  "
            style={{ background: "#fffaaa" }}
          >
            {filters?.campus} <MdOutlineCancel />{" "}
          </p>
          <p
            className="d-flex gap-3 py-3 px-4  rounded-5  "
            style={{ background: "#fffaaa" }}
          >
            {filters?.role} <MdOutlineCancel />
          </p>
          <p
            className="d-flex gap-3 py-3 px-4  rounded-5  "
            style={{ background: "#fffaaa" }}
          >
            {filters?.fromLoginDate} - {filters?.toLoginDate}{" "}
            <MdOutlineCancel />
          </p>
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
            className="border-800-blue border-2 btn-lg "
            style={{ width: "fit-content" }}
            onClick={toggleFiltering}
          >
            <FaFilter /> Filter Courses
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
