import CreateExamModal from "../../components/modals/CreateExamModal";
import ExamsTable from "../../components/tables/admin-tables/ExamsTable";
import useToggle from "../../utility/hooks/useToggle";

export default function Exams() {
  const [isCreating, toggleCreating] = useToggle();

  return (
    <>
      <div className="d-flex justify-content-between mb-5 align-items-center">
        <h1 className="text-bold">Exams</h1>
        <button
          onClick={toggleCreating}
          className="btn btn-blue-800 btn-lg w-25"
        >
          Create Exam
        </button>

        <CreateExamModal isOpen={isCreating} toggle={toggleCreating} />
      </div>

      {/* Exams Table */}
      <ExamsTable />
    </>
  );
}
