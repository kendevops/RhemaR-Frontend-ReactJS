import { useState } from "react";
import Tab from "../../components/atoms/Tab";
import SearchBarAutocomplete from "../../components/general/searchBarAutocomplete";
import NewSession from "../../components/modals/NewSession";
import AcademicSessionTable from "../../components/tables/admin-tables/AcademicSessionTable";
import CourseCompletionTable from "../../components/tables/admin-tables/CourseCompletionTable";
import useToggle from "../../utility/hooks/useToggle";
import CoursesTable from "../../components/tables/admin-tables/CoursesTable";
import SearchBar from "../../components/general/searchBar";
import { Link } from "react-router-dom";

const tabs = ["Course Curriculum", "Course Completion"];

export default function AdminCourses() {
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];
  const [isCreating, toggle] = useToggle();

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

      {/* Course curriculum tab */}
      {tab === 0 && (
        <section>
          <article className="d-flex gap-5 m-5">
            <div style={{ width: "70%" }}>
              <SearchBar />
            </div>

            <Link
              to={"/ict-admin/create-course"}
              className="btn btn-blue-800 btn-lg "
              style={{ width: "30%" }}
            >
              Create Course
            </Link>
          </article>

          <CoursesTable />
        </section>
      )}

      {/**Start Course Completion Tab */}
      {tab === 1 && (
        <section>
          {/* Search Bar */}
          <div style={{ marginLeft: "2%", marginTop: "30px" }}>
            <h2 className="text-xl font-bold text-blue-600">
              Browse List of Students Progress
            </h2>
            {/* 
            <article className="d-flex gap-5 m-5">
              <SearchBarAutocomplete />
            </article> */}
          </div>

          <article>
            {/* Table */}
            <CourseCompletionTable />
          </article>
        </section>
      )}
      {/**End Course Completion Tab */}
    </section>
  );
}
