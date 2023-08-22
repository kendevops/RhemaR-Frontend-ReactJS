import { useState } from "react";
import { Spinner } from "reactstrap";
import useClasses from "../../hooks/queries/classes/useClasses";
import Tab from "../atoms/Tab";
import { Link, useHistory } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import StudentScheduleTable from "../tables/students-table/scheduleTable";

export default function SessionSchedule({ title }: any) {
  const [viewing, setViewing] = useState(0);
  const [clas, setClas] = useState(0);

  const history = useHistory();

  let classTabs = [
    "L1 Weekend Schedule X",
    "L1 Night Schedule X",
    "L2 Schedule X",
  ];

  const currentClass = classTabs[clas];

  const monthParam = viewing + 1 < 10 ? `0${viewing + 1}` : viewing + 1;

  const { data, isLoading } = useClasses({
    startTime: `${new Date().getFullYear()}-${monthParam}-01T21:56:53.900Z`,
  });

  const allClasses = data?.classes?.nodes;
  let classes = allClasses;

  console.log(classes);

  if (classes && classes[0]?.campus?.name === "Abuja") {
    classTabs = ["L1 Weekend Schedule", "L1 Night Schedule", "L2 Schedule"];
  }

  if (currentClass === "Weekend Classes") {
    classes = allClasses?.filter((clas: any) => clas?.type === "weekend");
  }

  if (currentClass === "Night Classes") {
    classes = allClasses?.filter((clas: any) => clas?.type === "night");
  }

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
            {classTabs?.map((t, i) => {
              return (
                <Tab
                  key={t}
                  tabColor="#289483"
                  isSelected={currentClass === t}
                  onClick={() => {
                    setClas(i);
                  }}
                >
                  {t}
                </Tab>
              );
            })}
          </Tab.Wrapper>

          <button className="btn btn-blue-800 py-2 px-4 text-xl ">
            Download (PDF)
          </button>
        </div>

        {/* Class List */}
        <div>
          <StudentScheduleTable />
        </div>
      </section>
    </>
  );
}
