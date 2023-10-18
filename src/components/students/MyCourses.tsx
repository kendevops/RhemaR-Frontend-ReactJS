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
import useClasses from "../../hooks/queries/classes/useClasses";

Chart.register(ArcElement);

const TabOptions = ["Course Completion", "Missed Classes"];
const courseColumns: TableColumns<any>[] = [
  {
    key: "Course Title",
    title: "Course Title",
    render: (data) => <p>{data?.name}</p>,
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
        <div className="d-flex justify-content-center ">
          <Doughnut
            style={{
              maxWidth: "3rem",
              maxHeight: "3rem",
              textAlign: "center",
            }}
            height={5}
            width={5}
            data={dat}
          />
        </div>
      );
    },
  },
  {
    key: "Score",
    title: "Score",
    render: (data) => (
      <p style={{ textAlign: "center" }}>{data?.report?.score ?? "-"}</p>
    ),
  },
];

const missedColumns: TableColumns<any>[] = [
  {
    key: "Course Title",
    render: (d) => <p>{d?.name}</p>,
    title: "Course Title",
  },
  // {
  //   key: "Next Available Date",
  //   render: (d) => <p>{d?.nextAvailableDate?.toDateString()}</p>,
  //   title: "Next Available Date",
  // },
  // {
  //   key: "Action",
  //   render: (d) => <u>Re-sit Course</u>,
  //   title: "Action",
  // },
];

export default function MyCourses() {
  const { data: courses, isLoading } = useCourses();
  const [missedCourses, setMissedCourses] = useState(false);

  let coursesData: any[] = courses?.courses?.nodes;

  // for missed classes, set the start time to a previous date
  const { data, isLoading: missedLoading } = useClasses({});

  const missedData = data?.classes?.nodes;

  console.log(missedData);

  const dataLoaded = !!missedData && !!coursesData;

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
              tabColor="#203864"
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
          {(isLoading || missedLoading) && <Spinner />}
          {dataLoaded && (
            <Table
              columns={missedCourses ? missedColumns : courseColumns}
              data={missedCourses ? missedData : coursesData}
            />
          )}
        </Table.Wrapper>
      </div>
    </>
  );
}
