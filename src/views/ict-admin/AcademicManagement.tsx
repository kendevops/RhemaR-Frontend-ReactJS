import { Fragment, useEffect, useState, ChangeEvent } from "react";
import useToggle from "../../utility/hooks/useToggle";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useRoles from "../../hooks/queries/useRoles";

import Tab from "../../components/atoms/Tab";
import { Icon } from "@iconify/react";
import { HiPlus } from "react-icons/hi";
import CampusDetailModal from "../../components/modals/CampusDetailModal";
import AddLevelModal from "../../components/modals/AddLevelModal";
import AddCampusModal from "../../components/modals/AddCampusModal";
import LevelTable from "../../components/tables/admin-tables/LevelTable";
import CampusesTable2 from "../../components/tables/admin-tables/CampusesTable2";
import AcademicTuitionTable from "../../components/tables/admin-tables/AcademicTuitionTable";
import AcademicAddTuitionModal from "../../components/modals/AcademicAddTuitionModal";
import NewSession from "../../components/modals/NewSession";
import AcademicSessionTable from "../../components/tables/admin-tables/AcademicSessionTable";
import AcademicCoreCoursesTable from "../../components/tables/admin-tables/AcademicCoreCoursesTable";
import AcademicAddCoreCoursesModal from "../../components/modals/AcademicCoreCoursesTable";
import AcademicSessionCoursesTable from "../../components/tables/admin-tables/AcademicSessionCoursesTable";
import AcademicAddSessionCoursesModal from "../../components/modals/AcademicAddSessionCoursesModal";
import Papa from "papaparse";
import useUploadUsers from "../../hooks/mutations/users/useUploadUsers";
import useAllUsers from "../../hooks/queries/useAllUsers";
import handleError from "../../utils/handleError";
import { Spinner } from "reactstrap";
import AdminCourses from "./Courses";

const tabs = [
  "Campus",
  "Tuition",
  "Session",
  "Core Courses",
  "Session Courses",
  "Levels",
];

export default function AcademicManager() {
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];
  const [visibility, toggle] = useToggle();
  const [showAddLevel, setShowAddLevel] = useState(false);
  const [showAddCampus, setShowAddCampus] = useState(false);
  const [showCampusDetail, setShowCampusDetail] = useState(false);

  const { data: campusesData } = useAllCampuses();
  const { data: rolesData } = useRoles();

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

  const cancelModelVisibility = () => {
    setShowAddLevel(() => false);
    setShowAddCampus(() => false);
    setShowCampusDetail(() => false);
  };

  useEffect(() => {
    if (!visibility) {
      cancelModelVisibility();
    }
  }, [visibility]);

  const handleAddlevelClick = () => {
    toggle();
    setShowAddLevel(true);
  };

  function onSearch() {}

  return (
    <Fragment>
      {/* Header */}
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Academic Management</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>RHEMA Bible Training Center, Nigeria</div>
      </div>
      <Tab.Wrapper>
        {tabs?.map((t, i) => {
          return (
            <Tab
              key={t}
              onClick={() => setTab(i)}
              tabColor="#289483"
              isSelected={currentTab === t}
            >
              {t}
            </Tab>
          );
        })}
      </Tab.Wrapper>

      <div id="Modals">
        {showCampusDetail && (
          <CampusDetailModal
            data={"name"}
            visibility={visibility}
            toggle={toggle}
          />
        )}
        {showAddLevel && (
          <AddLevelModal visibility={visibility} toggle={toggle} />
        )}

        {showAddCampus && (
          <AddCampusModal visibility={visibility} toggle={toggle} />
        )}

        {tab === 1 && (
          <AcademicAddTuitionModal visibility={visibility} toggle={toggle} />
        )}

        {tab === 2 && <NewSession visibility={visibility} toggle={toggle} />}

        {/* {tab === 3 && (
          <AcademicAddCoreCoursesModal
            visibility={visibility}
            toggle={toggle}
          />
        )} */}

        {tab === 4 && (
          <AcademicAddSessionCoursesModal
            visibility={visibility}
            toggle={toggle}
          />
        )}
      </div>

      <div>
        <article className="d-flex gap-5 my-4 align-items-center" id="Search">
          <div style={{ flex: 1 }}>
            <div className="" style={{ color: "black", fontWeight: 700 }}>
              {tab === 0
                ? "RN Campuses"
                : tab === 1
                ? "RN Tuition"
                : tab === 2
                ? "RN Sessions"
                : tab === 3
                ? "RN Core Courses"
                : tab === 4
                ? "RN Courses for each  Session (Time Table)"
                : tab === 5
                ? "RN Level"
                : ""}
            </div>
          </div>
          <div
            className="d-flex gap-3 justify-content-end"
            style={{
              flex: 1,
            }}
          >
            {tab === 0 && (
              <>
                <label
                  className="btn btn-outline-light btn-lg d-flex align-items-center gap-3 text-center"
                  style={{
                    width: "fit-content",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <HiPlus />
                  Bulk Upload
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <input
                      className="form-control visually-hidden"
                      type="file"
                      name="file"
                      accept=".csv"
                      onChange={importHandler}
                    />
                  )}
                </label>
                <button
                  className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                  style={{ width: "fit-content" }}
                  onClick={() => {
                    toggle();
                    setShowAddCampus(true);
                  }}
                >
                  <HiPlus />
                  Add New Campus
                </button>
              </>
            )}

            {tab === 1 && (
              <button
                className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                style={{ width: "fit-content" }}
                onClick={() => {
                  toggle();
                }}
              >
                <HiPlus />
                Add New Tuition
              </button>
            )}

            {tab === 2 && (
              <button
                className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                style={{ width: "fit-content" }}
                onClick={toggle}
              >
                Add New Session
              </button>
            )}

            {/* {tab === 3 && (
              <button
                className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                style={{ width: "fit-content" }}
                onClick={toggle}
              >
                Add New Core Course
              </button>
            )} */}

            {tab === 4 && (
              <button
                className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                style={{ width: "fit-content" }}
                onClick={toggle}
              >
                Add New Session Course
              </button>
            )}

            {tab === 5 && (
              <div className="d-flex gap-4 ">
                <button
                  className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                  style={{ width: "fit-content" }}
                  onClick={handleAddlevelClick}
                >
                  Add Level
                </button>
              </div>
            )}
          </div>
        </article>
      </div>

      {tab === 0 && (
        <div>
          <main id="Table">
            <CampusesTable2
              setShowCampusDetail={setShowCampusDetail}
              toggle={toggle}
            />
          </main>
        </div>
      )}

          <button
            className="btn btn-blue-800 btn-lg d-flex gap-3 my-3   align-items-center "
            style={{ width: "fit-content" }}
          >
            <HiPlus />
            Export Campus List
          </button>
        </article>
      </div>

      <button
        className="btn btn-blue-800 btn-lg d-flex gap-3 my-3   align-items-center "
        style={{ width: "fit-content" }}
      >
        <HiPlus />
        Export Campus List
      </button>

      {/* level */}

      {tab === 5 && (
        <div className="w-100" style={{ width: "100%", margin: "20px auto" }}>
          <div id="Table">
            <LevelTable />
          </div>
        </div>
      )}

      {tab === 1 && (
        <main id="Table">
          <AcademicTuitionTable />
        </main>
      )}

      {/* Academic Sessions */}
      {tab === 2 && <AcademicSessionTable />}

      {/* {tab === 3 && <AcademicCoreCoursesTable />} */}
      {tab === 3 && <AdminCourses />}

      {tab === 4 && <AcademicSessionCoursesTable />}
    </Fragment>
  );
}
