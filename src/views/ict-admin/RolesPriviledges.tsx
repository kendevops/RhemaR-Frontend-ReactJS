import React from "react";
import SearchBar from "../../components/general/searchBar";
import AddPrivilege from "../../components/modals/AddPrivilege";
import PrivilegeTable from "../../components/tables/admin-tables/PrivilegeTable";
import useToggle from "../../utility/hooks/useToggle";

export default function RolesPriviledges() {
  const [modalVisible, toggleModal] = useToggle();

  return (
    <section>
      {/* Modal for adding Privileges */}
      <AddPrivilege toggle={toggleModal} visibility={modalVisible} />

      {/* Search Bar and add Staff */}
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        {/* <button
          onClick={toggleModal}
          className="btn btn-blue-800 btn-lg "
          style={{ width: "30%" }}
        >
          Add Privilege
        </button> */}
      </article>

      {/* Table */}

      <PrivilegeTable />
    </section>
  );
}
