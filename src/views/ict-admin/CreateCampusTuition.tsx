import SearchBar from "../../components/general/searchBar";
// import AddCampusModal from "../../components/modals/AddCampusModal";
import AddTuition from "../../components/modals/AddTuition";
import CampusesTable from "../../components/tables/admin-tables/CampusesTable";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useToggle from "../../utility/hooks/useToggle";
import BackButton from "../../components/molecules/BackButton";

export default function CreateCampusTuition() {
  const [isOpen, toggle] = useToggle();
  const { refetch } = useAllCampuses();
  const [session, toggleSession] = useToggle();

  return (
    <>
      <BackButton />

      {/* Search Bar and add Campus */}
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        {/* <AddCampusModal {...{ isOpen, toggle, onCreate: refetch }} /> */}
        <AddTuition visibility={session} toggle={toggleSession} />

        <button
          onClick={toggleSession}
          className="btn btn-blue-800 btn-lg "
          style={{ width: "30%" }}
        >
          Add Campus Tuition
        </button>
      </article>

      {/* Table */}
      <CampusesTable />
    </>
  );
}
