import SearchBar from "../../components/general/searchBar";
import AddCampusModal from "../../components/modals/AddCampusModal";
import CampusesTable from "../../components/tables/admin-tables/CampusesTable";
import useToggle from "../../utility/hooks/useToggle";

export default function Campuses() {
  const [isOpen, toggle] = useToggle();
  return (
    <>
      {/* Search Bar and add Campus */}
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        <AddCampusModal {...{ isOpen, toggle }} />

        <button
          onClick={toggle}
          className="btn btn-blue-800 btn-lg "
          style={{ width: "30%" }}
        >
          Add Campus
        </button>
      </article>

      {/* Table */}
      <CampusesTable />
    </>
  );
}
