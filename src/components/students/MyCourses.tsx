import { useState } from "react";
import {
  Course,
  Courses,
  MissedCourse,
  missedCourses as missed,
} from "../../data/Courses";
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

const missedColumns: TableColumns<MissedCourse>[] = [
  {
    key: "Course Title",
    render: (d) => <p>{d?.title}</p>,
    title: "Course Title",
  },
  {
    key: "Next Available Date",
    render: (d) => <p>{d?.nextAvailableDate?.toDateString()}</p>,
    title: "Next Available Date",
  },
  {
    key: "Action",
    render: (d) => <u>Re-sit Course</u>,
    title: "Action",
  },
];

export default function MyCourses() {
  const [missedCourses, setMissedCourses] = useState(false);
  let data: any[] = Courses;

  if (missedCourses) {
    data = missed;
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
        <Table.Wrapper>
          <Table
            columns={missedCourses ? missedColumns : courseColumns}
            data={data}
          />
        </Table.Wrapper>
      </div>
    </>
  );
}
