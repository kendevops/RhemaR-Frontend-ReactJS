import { useState } from "react";
import Tab from "../../components/atoms/Tab";
import AddSchedule from "../../components/modals/AddSchedule";
import NewSession from "../../components/modals/NewSession";
import AcademicSessionTable from "../../components/tables/admin-tables/AcademicSessionTable";
import CoursesScheduleTable from "../../components/tables/admin-tables/CoursesScheduleTable";
import useToggle from "../../utility/hooks/useToggle";

const tabs = ["Course Curriculum", "Course Completion"];

export default function AdminCourses() {
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  const [session, toggleSession] = useToggle();
  const [schedule, toggleSchedule] = useToggle();

  return (
    <section>
      {/* Header */}
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

      {/* Academic Sections */}
      {tab === 0 && (
        <section>
          <article>
            {/* Header */}
            <div
              className="d-flex justify-content-between my-3 p-4 align-items-baseline"
              aria-level={2}
              role={"heading"}
            >
              <h2 className="text-xl font-bold text-blue-600">
                Academic Sessions
              </h2>
              <div>
                <button
                  onClick={toggleSession}
                  className="btn btn-blue-800 btn-lg "
                >
                  New Session
                </button>
                <NewSession visibility={session} toggle={toggleSession} />
              </div>
            </div>

            {/* Table */}
            <AcademicSessionTable />
          </article>

          {/* Courses Schedule */}
          <article>
            {/* Header */}
            <div
              className="d-flex justify-content-between my-3 p-4 align-items-baseline"
              aria-level={2}
              role={"heading"}
            >
              <h2 className="text-xl font-bold text-blue-600">
                Courses Schedule
              </h2>
              <div>
                <button
                  onClick={toggleSchedule}
                  className="btn btn-blue-800 btn-lg "
                >
                  Add Schedule
                </button>
                <AddSchedule toggle={toggleSchedule} visibility={schedule} />
              </div>
            </div>

            {/* Table */}
            <CoursesScheduleTable />
          </article>
        </section>
      )}
    </section>
  );
}
