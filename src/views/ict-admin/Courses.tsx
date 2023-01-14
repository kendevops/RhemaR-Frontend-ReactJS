import { useState } from "react";
import Tab from "../../components/atoms/Tab";
import SearchBarAutocomplete from "../../components/general/searchBarAutocomplete";
import NewSession from "../../components/modals/NewSession";
import AcademicSessionTable from "../../components/tables/admin-tables/AcademicSessionTable";
import CourseCompletionTable from "../../components/tables/admin-tables/CourseCompletionTable";
import useToggle from "../../utility/hooks/useToggle";

const tabs = ["Course Curriculum", "Course Completion"];

export default function AdminCourses() {
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

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
      {tab === 0 && <section>{/* All Courses */}</section>}

      {/**Start Course Completion Tab */}
      {tab === 1 && (
        <section>
          {/* Search Bar */}
          <div style={{ marginLeft: "2%", marginTop: "30px" }}>
            <h2 className="text-xl font-bold text-blue-600">
              Browse List of Students Progress
            </h2>

            <article className="d-flex gap-5 m-5">
              <SearchBarAutocomplete />
            </article>
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
