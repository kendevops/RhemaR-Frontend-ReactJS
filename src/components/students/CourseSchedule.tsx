import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "react-feather";
import colors from "../../assets/img/Colors";
import { WeekendClasses } from "../../data/Classes";
import { months } from "../../utils/getMonth";
import Tab from "../atoms/Tab";
import UpcomingEvent from "../molecules/UpcomingEvent";

const classTabs = ["Weekend Classes", "Night Classes"];

export default function CourseSchedule() {
  const [viewing, setViewing] = useState(0);
  const [nightClass, setNightClass] = useState(false);

  let classes = WeekendClasses;

  if (nightClass) {
    classes = [];
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

  //   For toggling Night class
  function toggleNightClass() {
    setNightClass((p) => !p);
  }

  return (
    <>
      {/* Header */}
      <section className="mb-3 d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-center">
          <Calendar color={colors.primary} />
          <h6 className="text-lg font-bold text-blue-600">
            {`${months[viewing]} ${new Date().getFullYear()}`}
          </h6>
        </div>

        <div className="d-flex gap-3">
          <button
            className="btn-sm p-2 rounded-2 border-0"
            style={{
              backgroundColor: colors.primary,
            }}
            onClick={() => handleViewing("prev")}
          >
            <ChevronLeft color="white" />
          </button>
          <button
            className="btn-sm p-2 rounded-2 border-0"
            style={{
              backgroundColor: colors.primary,
            }}
            onClick={() => handleViewing("next")}
          >
            <ChevronRight color="white" />
          </button>
        </div>
      </section>

      {/* Classes */}
      <section className="">
        {/* Tabs */}
        <Tab.Wrapper>
          {classTabs?.map((t, i) => {
            function checkSelected() {
              return i === 0 ? !nightClass : nightClass;
            }
            return (
              <Tab
                key={t}
                tabColor="#289483"
                isSelected={checkSelected()}
                onClick={toggleNightClass}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        {/* Class List */}
        <div>
          {classes?.map((clas, i) => {
            return <UpcomingEvent key={i} {...clas} />;
          })}
        </div>
      </section>
    </>
  );
}
