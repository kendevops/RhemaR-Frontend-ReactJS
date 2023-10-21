import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "react-feather";
import { Spinner } from "reactstrap";
import colors from "../../assets/img/Colors";
import { WeekendClasses } from "../../data/Classes";
import useClasses from "../../hooks/queries/classes/useClasses";
import { months } from "../../utils/getMonth";
import Tab from "../atoms/Tab";
import UpcomingEvent from "../molecules/UpcomingEvent";
import { Link, useHistory } from "react-router-dom";
import isWithinCurrentDateRange from "../../utils/isWithinDateRange";
import { FaCalendarAlt } from "react-icons/fa";
import BButton from "../general/button";
import StudentScheduleTable from "../tables/students-table/scheduleTable";
import StudentAcademicReportTable from "../tables/students-table/StudentAcademicReportTable";

export default function AcademicReport({ title }: any) {
  const [viewing, setViewing] = useState(0);
  // const [clas, setClas] = useState(0);

  // const history = useHistory();

  // let classTabs = ["Summary", "Detailed"];

  // const currentClass = classTabs[clas];

  const monthParam = viewing + 1 < 10 ? `0${viewing + 1}` : viewing + 1;

  const { data, isLoading } = useClasses({
    startTime: `${new Date().getFullYear()}-${monthParam}-01T21:56:53.900Z`,
  });

  const allClasses = data?.classes?.nodes;
  let classes = allClasses;

  console.log(classes);

  // if (classes && classes[0]?.campus?.name === "Abuja") {
  //   classTabs = ["L1 Weekend Schedule", "L1 Night Schedule", "L2 Schedule"];
  // }

  // if (currentClass === "Weekend Classes") {
  //   classes = allClasses?.filter((clas: any) => clas?.type === "weekend");
  // }

  // if (currentClass === "Night Classes") {
  //   classes = allClasses?.filter((clas: any) => clas?.type === "night");
  // }

  // For navigating between dates
  function handleViewing(direction: "prev" | "next") {
    const isPrev = direction === "prev";
    setViewing((p) => {
      if (p <= 11) {
        return p + (isPrev ? -1 : 1);
      } else return 0;
    });
  }

  return (
    <>
      {isLoading && <Spinner />}

      {/* Classes */}
      <section className="">
        <div
          className="gap-3 mt-5"
          style={{
            fontWeight: 700,
            fontSize: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaCalendarAlt className="mb-3" />
          <p className="" style={{ fontWeight: 700, fontSize: "25px" }}>
            {title}
          </p>
        </div>
        <hr />
        {/* Tabs */}
        <div className="d-flex justify-content-between mb-2">
          <button className="btn btn-blue-800 py-2 px-4 text-xl ">
            Download (PDF)
          </button>
        </div>

        {/* Class List */}
        <div>
          <StudentAcademicReportTable />
        </div>
      </section>
    </>
  );
}
