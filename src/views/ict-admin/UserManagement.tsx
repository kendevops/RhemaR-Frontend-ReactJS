import React, { ChangeEvent, useState } from "react";
import Tab from "../../components/atoms/Tab";
import UserManagementTable from "../../components/tables/admin-tables/UserManagementTable";
import useToggle from "../../utility/hooks/useToggle";
import SearchBar from "../../components/general/searchBar";
import AddStaff from "../../components/modals/AddStaff";
import StudentsManagementTable from "../../components/tables/admin-tables/StudentsManagementTable";
import Papa from "papaparse";
import useUploadUsers from "../../hooks/mutations/users/useUploadUsers";
import { Spinner } from "reactstrap";
import useAllUsers from "../../hooks/queries/useAllUsers";
import handleError from "../../utils/handleError";
import { AiOutlineCaretDown } from "react-icons/ai";
import UploadBulkStudentModal from "../../components/modals/UploadBulkStudentsModal";
import AddStudentModal from "../../components/modals/AddStudentModal";
import { Icon } from "@iconify/react";
import AllUserTable from "../../components/tables/admin-tables/AllUsersTable";

export default function UserManagement() {
  const Options = ["All", "Staff", "Students"];
  const [option, setOption] = useState(0);
  const [addStudentDropDown, setAddStudentDropDown] = useState(false);

  const currentOption = Options[option];

  const [modalState, toggleModal] = useToggle();
  const [isAdding, toggleAdding] = useToggle();
  const [isBulkUploadOpen, toggleBulkUpload] = useToggle();

  const { isLoading, mutate } = useUploadUsers();
  const { refetch } = useAllUsers();

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

  return (
    <section>
      {/* Modal For Adding Staff */}
      <AddStaff toggle={toggleModal} visibility={modalState} />
      <AddStudentModal isOpen={isAdding} toggle={toggleAdding} />
      <UploadBulkStudentModal
        isOpen={isBulkUploadOpen}
        toggle={toggleBulkUpload}
        refetch={refetch}
      />

      {/* Header */}

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Users Management</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        {/* <div>{`${userData?.campus?.name}`}</div> */}
      </div>
      <div role={"tabpanel"} className="d-flex px-2 gap-3 border-bottom ">
        {Options.map((o, i) => {
          const isSelected = i === option;
          function handleSelect() {
            setOption(i);
          }

          return (
            <Tab
              tabColor="#203864"
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
      <article className="d-flex justify-content-between  gap-5 my-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        {currentOption === "Staff" ? (
          <button
            onClick={toggleModal}
            className="btn btn-blue-800 btn-lg "
            style={{ width: "30%" }}
          >
            Add Staff
          </button>
        ) : (
          <div
            className=""
            style={{
              height: `${addStudentDropDown ? "150px" : ""}`,
            }}
          >
            <button
              className="btn btn-blue-800 btn-lg mb-3 "
              style={{ width: "fit-content" }}
              onClick={() => setAddStudentDropDown(() => !addStudentDropDown)}
            >
              Add student <AiOutlineCaretDown className="mx-3" />
            </button>

            {addStudentDropDown && (
              <div
                className="position-absolute d-flex gap-3 flex-column z-3 "
                style={{ width: "200px" }}
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
        )}
      </article>

      {/* Table */}
      {currentOption === "All" && <AllUserTable />}
      {currentOption === "Staff" && <UserManagementTable />}
      {currentOption === "Students" && <StudentsManagementTable />}
    </section>
  );
}
