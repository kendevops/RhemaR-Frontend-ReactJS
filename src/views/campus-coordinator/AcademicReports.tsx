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
import Tab from "../../components/atoms/Tab";
import ClearanceTable from "../../components/tables/admin-tables/ClearanceTable";
import CardReplacementTable from "../../components/tables/admin-tables/CardReplacementTable";

const tabs = ["Clearance", "Card Replacement"];
const levelTabs = ["Level 1", "Level 2"];

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

  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];
  const [levelTab, setLevelTab] = useState(0);
  const currentLevelTab = levelTabs[levelTab];

  const courses = coursesData?.courses;

  console.log(filters);

  const [isFiltering, toggleFiltering] = useToggle();
  const [isEditing, toggleEditing] = useToggle();

  const usersData = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("ADMIN"));
  });

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

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
        <div>Students Academic Reports</div>
      </div>

      <Tab.Wrapper>
        {tabs?.map((t, i) => {
          return (
            <Tab
              key={t}
              onClick={() => setTab(i)}
              tabColor="#203864"
              isSelected={currentTab === t}
            >
              {t}
            </Tab>
          );
        })}
      </Tab.Wrapper>

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
            <FaFilter /> Filter
          </button>
        </div>
      </article>

      {currentTab === "Clearance" && (
        <Tab.Wrapper>
          {levelTabs?.map((t, i) => {
            return (
              <Tab
                key={t}
                onClick={() => setLevelTab(i)}
                tabColor="#203864"
                isSelected={currentLevelTab === t}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>
      )}

      <main id="Table">
        {currentTab === "Clearance" && (
          <ClearanceTable
            level={`${currentLevelTab === "Level 1" ? "LEVEL_1" : "LEVEL_2"}`}
          />
        )}

        {currentTab === "Card Replacement" && <CardReplacementTable />}
      </main>
    </Fragment>
  );
}
