import { useState } from "react";
import { Spinner } from "reactstrap";
import useClasses from "../../hooks/queries/classes/useClasses";
import Tab from "../atoms/Tab";
import { Link, useHistory } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import StudentScheduleTable from "../tables/students-table/scheduleTable";
import QuizesTable from "../tables/students-table/QuizesTable";

export default function QuizesContainer({ title }: any) {
  const [viewing, setViewing] = useState(0);

  const history = useHistory();

  const monthParam = viewing + 1 < 10 ? `0${viewing + 1}` : viewing + 1;

  const { data, isLoading } = useClasses({
    startTime: `${new Date().getFullYear()}-${monthParam}-01T21:56:53.900Z`,
  });

  // For navigating between dates
  function handleViewing(direction: "prev" | "next") {
    const isPrev = direction === "prev";
    setViewing((p) => {
      if (p <= 11) {
        return p + (isPrev ? -1 : 1);
      } else return 0;
    });
  }

  /* TODO -  Upcoming 5 classes instead of per month
   * Caret Buttons become "View All" to view all courses
   */

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

        {/* Class List */}
        <div>
          <QuizesTable />
        </div>
      </section>
    </>
  );
}
