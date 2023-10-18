import { Icon } from "@iconify/react";
import useToggle from "../../utility/hooks/useToggle";
import UploadExamModal from "../../components/modals/UploadExamModal";
import useAllClassesAttendance from "../../hooks/queries/classes/useAllClassAttendance";
import ClassAttendanceTable from "../../components/tables/admin-tables/ClassAttendanceTable";
import AddClassAttendanceModal from "../../components/modals/AddClassAttentanceModal";

export default function ClassCourseAttendance() {
  const [isCreatingClassAttendance, toggleCreatingClassAttendance] =
    useToggle();
  const [isCreatingCourseAttendance, toggleCreatingCourseAttendance] =
    useToggle();
  const [isQuizUploadOpen, toggleQuizUpload] = useToggle();
  const [isExamUploadOpen, toggleExamUpload] = useToggle();

  const { refetch } = useAllClassesAttendance();

  return (
    <>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Class Attendance</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
      </div>

      <>
        <div className="d-flex justify-content-end mb-5 align-items-center">
          <div className="d-flex  align-items-center gap-5 ">
            <button
              onClick={() => {}}
              className="btn btn-blue-800 btn-lg w-auto "
            >
              Upload Class Attendance
            </button>
            <button
              onClick={toggleCreatingClassAttendance}
              className="btn btn-blue-800 btn-lg w-auto"
            >
              Create Class Attendance
            </button>
          </div>

          <AddClassAttendanceModal
            visibility={isCreatingClassAttendance}
            toggle={toggleCreatingClassAttendance}
            onCreate={refetch}
          />
        </div>

        {/* Exams Table */}
        <ClassAttendanceTable />
      </>

      <UploadExamModal
        isOpen={isExamUploadOpen}
        toggle={() => {}}
        refetch={refetch}
      />
    </>
  );
}
//here
