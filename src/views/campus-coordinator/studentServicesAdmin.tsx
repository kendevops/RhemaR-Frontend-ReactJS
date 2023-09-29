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
import AddAdminModal from "../../components/modals/AddAdminModal";
import EditAdminModal from "../../components/modals/editModals/EditAdminModal";
import AddAdminBySSAdminModal from "../../components/modals/AddAdminBySSAdmin";
import TableProfilePicture from "../../components/general/tableProfilePic";
import { FaRegEye } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { Icon } from "@iconify/react";
import { MdOutlineCancel } from "react-icons/md";

type FiltersProps = {
  campus?: string;
  role?: string;
  fromLoginDate?: string;
  toLoginDate?: string;
};

export default function AdminManagement() {
  const [filters, setFilters] = useState<FiltersProps>({});
  const [filtering, setFiltering] = useState(false);
  const { data, isLoading } = useAllUsers(filters);
  const { data: campusesData } = useAllCampuses();
  const { data: rolesData } = useRoles();
  const { data: userData, isLoading: userLoading } = useCurrentUser();

  console.log(filters);

  const [isFiltering, toggleFiltering] = useToggle();
  const [isAdding, toggleAdding] = useToggle();
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
        id: "fromLoginDate",
        name: "Last Login Date (From)",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "toLoginDate",
        name: "Last Login Date (To)",
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
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i}</p> },
    { key: "Pic", title: "Pic", render: (data, i) => <TableProfilePicture /> },

    {
      key: "First name",
      title: "First name",
      render: (data) => <p>{data?.firstName}</p>,
    },
    {
      key: "Last name",
      title: "Last name",
      render: (data) => <p>{data?.lastName}</p>,
    },
    {
      key: "Roles",
      title: "Roles",
      render: (data) => (
        <p>
          {data?.roles?.map(
            (r: any, i: number) =>
              `${parseRole(r?.name)}${
                i === data?.roles?.length - 1 ? "" : ", "
              }`
          )}
        </p>
      ),
    },
    {
      key: "Campus",
      title: "Campus",
      render: (data) => <p>{"HQ"}</p>,
    },
    {
      key: "Last Login",
      title: "Last Login",
      render: (data) => <p>{"1 Week Ago"}</p>,
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log("usersData", data);
        return (
          <div className="d-flex gap-4">
            {/* <p className="" style={{ color: "red", cursor: "pointer" }}>
              Delete
            </p> */}

            <FaRegEye style={{ cursor: "pointer", fontSize: "23px" }} />
            <RiDeleteBin6Line style={{ cursor: "pointer", fontSize: "23px" }} />

            {/* <p onClick={toggleEditing} style={{ cursor: "pointer" }}>
              Edit
            </p> */}
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div id="Modals">
        <FilterModal {...filterProps} />
        <AddAdminBySSAdminModal isOpen={isAdding} toggle={toggleAdding} />
      </div>

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Student Services Admin</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.campus?.name}`}</div>
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
            className="btn btn-outline-info btn-lg "
            style={{ width: "fit-content" }}
            onClick={toggleFiltering}
          >
            Filter
          </button>
          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleAdding}
          >
            Add admin
          </button>
        </div>
      </article>

      <main id="Table">
        {isLoading && <Spinner />}
        <Table.Wrapper>
          {usersData && (
            <Table
              columns={columns}
              data={userData?.campus?.name === "HQ" ? usersData : ssData}
            />
          )}
        </Table.Wrapper>
      </main>
    </Fragment>
  );
}
