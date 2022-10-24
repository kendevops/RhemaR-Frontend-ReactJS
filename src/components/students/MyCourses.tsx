import { useState } from "react";
import { Course, Courses } from "../../data/Courses";
import Tab from "../atoms/Tab";
import Table, { TableColumns } from "../general/table/Table";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement);

const TabOptions = ["Course Completion", "Missed Courses"];
const courseColumns: TableColumns<Course>[] = [
  {
    key: "Course Title",
    title: "Course Title",
    render: (data) => <p>{data?.title}</p>,
  },
  {
    key: "% Complete",
    title: "% Complete",
    render: (data) => {
      const dat = {
        labels: ["Completion", ""],
        datasets: [
          {
            data: [data?.completion, 100 - data?.completion],
            backgroundColor: ["#FF6384", "#ffffff"],
            borderWidth: 2,
          },
        ],
      };

      return (
        <Doughnut
          style={{
            maxWidth: "3rem",
            maxHeight: "3rem",
          }}
          height={5}
          width={5}
          data={dat}
        />
      );
    },
  },
  {
    key: "Score",
    title: "Score",
    render: (data) => <p>{data?.score ?? "-"}</p>,
  },
];

export default function MyCourses() {
  const [missedCourses, setMissedCourses] = useState(false);
  let data = Courses;

  if (missedCourses) {
    data = [];
  }

  // Toggle missed course
  function toggleCourse() {
    setMissedCourses((p) => !p);
  }

  return (
    <>
      {/* Tabs */}
      <Tab.Wrapper>
        {TabOptions?.map((t, i) => {
          function checkSelected() {
            return i === 0 ? !missedCourses : missedCourses;
          }
          return (
            <Tab
              key={t}
              tabColor="#289483"
              isSelected={checkSelected()}
              onClick={toggleCourse}
            >
              {t}
            </Tab>
          );
        })}
      </Tab.Wrapper>

      <div className="rounded-3 border-1 mt-3">
        <div className="tab-content p-4" id="pills-tabContent">
          <div className="table-responsive rounded-2 r-card bg-white">
            <Table columns={courseColumns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
