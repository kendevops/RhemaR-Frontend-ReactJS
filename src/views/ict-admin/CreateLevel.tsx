import SearchBar from "../../components/general/searchBar";
import AddLevelModal from "../../components/modals/AddLevelModal";
import LevelTable from "../../components/tables/admin-tables/LevelTable";
import useToggle from "../../utility/hooks/useToggle";
import BackButton from "../../components/molecules/BackButton";

export default function CreateLevel() {
  const [session, toggleSession] = useToggle();

  return (
    <>
      {/* Search Bar and add Campus */}
      <BackButton />
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>

        <AddLevelModal visibility={session} toggle={toggleSession} />

        <button
          onClick={toggleSession}
          className="btn btn-blue-800 btn-lg "
          style={{ width: "30%" }}
        >
          Create Level
        </button>
      </article>

      <LevelTable />
    </>
  );
}
