import AddSchedule from "../../components/modals/AddSchedule";
import NewSession from "../../components/modals/NewSession";
import AcademicSessionTable from "../../components/tables/admin-tables/AcademicSessionTable";
import CoursesScheduleTable from "../../components/tables/admin-tables/CoursesScheduleTable";
import useToggle from "../../utility/hooks/useToggle";

export default function TimeTable() {
  const [schedule, toggleSchedule] = useToggle();
  const [session, toggleSession] = useToggle();

  return (
    <>
      {/* Courses Schedule */}
      <article>
        {/* Header */}
        <div
          className="d-flex justify-content-between my-3 p-4 align-items-baseline"
          aria-level={2}
          role={"heading"}
        >
          <h1 className="font-bold text-blue-600">Timetable</h1>
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

        {/* Courses Table */}
        <CoursesScheduleTable />
      </article>

      {/* Academic Sessions */}
      <section>
        <article>
          {/* Header */}
          <div
            className="d-flex justify-content-between my-3 p-4 align-items-baseline"
            aria-level={2}
            role={"heading"}
          >
            <h1 className="font-bold text-blue-600">Academic Sessions</h1>

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
      </section>
    </>
  );
}
