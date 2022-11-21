import SearchBar from "../../components/general/searchBar";
import InstructorsTable from "../../components/tables/admin-tables/InstructorsTable";
import useToggle from "../../utility/hooks/useToggle";

export default function Instructors() {
  const [isOpen, toggle] = useToggle();

  return (
    <section>
      {/* Add Instructor Modal */}

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
      <InstructorsTable />
    </section>
  );
}
