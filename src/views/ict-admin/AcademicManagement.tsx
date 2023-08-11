import { Fragment, useEffect, useState } from "react";
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

const tabs = [
  "Campus",
  "Tuition",
  "Session",
  "Core Courses",
  "Session Courses",
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
      </div>
      {tab === 0 && (
        <div>
          <div>
            <article
              className="d-flex gap-5 my-4 align-items-center"
              id="Search"
            >
              <div style={{ flex: 1 }}>
                <div className="" style={{ color: "black", fontWeight: 700 }}>
                  RN Campuses
                </div>{" "}
              </div>
              <div
                className="d-flex gap-3 justify-content-end"
                style={{
                  flex: 1,
                }}
              >
                <button
                  className="btn btn-outline-light  btn-lg d-flex align-items-center gap-3 text-center "
                  style={{ width: "fit-content", alignItems: "center" }}
                  onClick={() => {}}
                >
                  <HiPlus />
                  Bulk Upload
                </button>
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
              </div>
            </article>

            <main id="Table">
              <CampusesTable2
                setShowCampusDetail={setShowCampusDetail}
                toggle={toggle}
              />
            </main>
          </div>

          {/* level */}

          <div className="w-100" style={{ width: "100%", margin: "20px auto" }}>
            <article
              className="d-flex gap-5 my-4 align-items-start w-100"
              id="Search"
              style={{ width: "100%" }}
            >
              <div className="w-50 ">
                <div className="d-flex px-4 ">
                  <div style={{ flex: 1 }}>
                    <div
                      className=""
                      style={{ color: "black", fontWeight: 700 }}
                    >
                      RN Level
                    </div>{" "}
                  </div>

                  <button
                    className="btn btn-outline-light  btn-lg d-flex align-items-center gap-3 text-center "
                    style={{
                      width: "fit-content",
                      alignItems: "center",
                      border: "2px solid blue",
                    }}
                    onClick={handleAddlevelClick}
                  >
                    <HiPlus />
                    Add level
                  </button>
                </div>

                <div>
                  <LevelTable />
                </div>
              </div>

              <div>
                <button
                  className="btn btn-blue-800 btn-lg d-flex gap-3  align-items-center "
                  style={{ width: "fit-content" }}
                >
                  <HiPlus />
                  Export Campus List
                </button>
              </div>
            </article>
          </div>
        </div>
      )}

      {tab !== 0 && <div>Coming Soon</div>}
    </Fragment>
  );
}
