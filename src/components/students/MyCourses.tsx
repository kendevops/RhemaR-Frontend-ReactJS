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
import useCourses from "../../hooks/queries/classes/useCourses";
import { Spinner } from "reactstrap";

Chart.register(ArcElement);

const TabOptions = ["Course Completion", "Missed Courses"];
const courseColumns: TableColumns<any>[] = [
  {
    key: "Course Title",
    title: "Course Title",
    render: (data) => <p>{data?.title}</p>,
  },
  {
    key: "% Complete",
    title: "% Complete",
    render: (data) => {
      const completion = data?.report?.completion ?? 10;
      const dat = {
        labels: ["Completion", ""],
        datasets: [
          {
            data: [completion, 100 - completion],
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
    render: (data) => <p>{data?.report?.score ?? "-"}</p>,
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
  const { data: courses, isLoading } = useCourses();
  const [missedCourses, setMissedCourses] = useState(false);

  let data: any[] = courses?.courses;

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
          {isLoading && <Spinner />}
          <Table
            columns={missedCourses ? missedColumns : courseColumns}
            data={data}
          />
        </Table.Wrapper>
      </div>
    </>
  );
}
