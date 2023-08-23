import { useState } from "react";
import { Spinner } from "reactstrap";
import useClasses from "../../hooks/queries/classes/useClasses";
import Tab from "../atoms/Tab";
import { Link, useHistory } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import StudentScheduleTable from "../tables/students-table/scheduleTable";

export default function TuitionPaymentContainer({ title }: any) {
  const [viewing, setViewing] = useState(0);
  const [tuitionPayment, setTuitionPayment] = useState(0);

  const history = useHistory();

  let tutionTabs = ["Fee Breakdown", "Payment History"];

  const currentTuition = tutionTabs[tuitionPayment];

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
        {/* Tabs */}
        <div className="d-flex justify-content-between mb-2">
          <Tab.Wrapper className="d-flex gap-4  ">
            {tutionTabs?.map((t, i) => {
              return (
                <Tab
                  key={t}
                  tabColor="#289483"
                  isSelected={currentTuition === t}
                  onClick={() => {
                    setTuitionPayment(i);
                  }}
                >
                  {t}
                </Tab>
              );
            })}
          </Tab.Wrapper>
        </div>

        {/* Class List */}
        <div>
          <StudentScheduleTable />
        </div>
      </section>
    </>
  );
}
