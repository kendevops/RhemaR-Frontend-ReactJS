import React, { useState } from "react";
import Tab from "../../components/atoms/Tab";
import UserManagementTable from "../../components/tables/admin-tables/UserManagementTable";
import useToggle from "../../utility/hooks/useToggle";
import SearchBar from "../../components/general/searchBar";
import AddStaff from "../../components/modals/AddStaff";

export default function UserManagement() {
  const Options = ["Staff", "Students"];
  const [option, setOption] = useState(0);

  const currentOption = Options[option];

  const [modalState, toggleModal] = useToggle();

  return (
    <section>
      {/* Modal For Adding Staff */}
      <AddStaff toggle={toggleModal} visibility={modalState} />

      {/* Header */}
      <div role={"tabpanel"} className="d-flex px-2 gap-3 border-bottom ">
        {Options.map((o, i) => {
          const isSelected = i === option;
          function handleSelect() {
            setOption(i);
          }
          return (
            <Tab
              tabColor="#289483"
              key={o}
              onClick={handleSelect}
              isSelected={isSelected}
            >
              {o}
            </Tab>
          );
        })}
      </div>

      {/* Search Bar and add Staff */}
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        {currentOption === "Staff" && (
          <button
            onClick={toggleModal}
            className="btn btn-blue-800 btn-lg "
            style={{ width: "30%" }}
          >
            Add Staff
          </button>
        )}
      </article>

      {/* Table */}
      <div className="tab-content p-4" id="pills-tabContent">
        <div className="table-responsive rounded-2 r-card bg-white">
          {currentOption === "Staff" && <UserManagementTable />}
        </div>
      </div>
    </section>
  );
}
