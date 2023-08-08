import SearchBar from "../../components/general/searchBar";
import AssignInstructorModal from "../../components/modals/AssignInstructorModal";
import InstructorsTable from "../../components/tables/admin-tables/InstructorsTable";
import useToggle from "../../utility/hooks/useToggle";

export default function CampusCoordinatorInstructors() {
  const [visibility, toggle] = useToggle();
  const [refetch, toggleRefetch] = useToggle();

  return (
    <section>
      {/* Add Instructor Modal */}
      <AssignInstructorModal
        {...{ visibility, toggle, onAssign: toggleRefetch }}
      />

      {/* Search Bar and add Instructor */}
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        <button
          onClick={toggle}
          className="btn btn-blue-800 btn-lg "
          style={{ width: "30%" }}
        >
          Add Instructor
        </button>
      </article>

      {/* Table */}
      <InstructorsTable shouldRefetch={refetch} route="campus-coordinator" />
    </section>
  );
}
