import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "react-feather";
import { Spinner } from "reactstrap";
import colors from "../../assets/img/Colors";
import { WeekendClasses } from "../../data/Classes";
import useClasses from "../../hooks/queries/classes/useClasses";
import { months } from "../../utils/getMonth";
import Tab from "../atoms/Tab";
import UpcomingEvent from "../molecules/UpcomingEvent";
import { Link } from "react-router-dom";

const classTabs = ["All", "Weekend Classes", "Night Classes"];

export default function CourseSchedule() {
  const [viewing, setViewing] = useState(0);
  const [clas, setClas] = useState(0);
  const currentClass = classTabs[clas];

  const monthParam = viewing + 1 < 10 ? `0${viewing + 1}` : viewing + 1;

  const { data, isLoading } = useClasses({
    startTime: `${new Date().getFullYear()}-${monthParam}-01T21:56:53.900Z`,
  });

  const allClasses = data?.classes?.nodes;
  let classes = allClasses;

  if (currentClass === classTabs[1]) {
    classes = allClasses?.filter((clas: any) => clas?.type === "weekend");
  }

  if (currentClass === classTabs[2]) {
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
      {/* Header */}
      <section className="mb-3 d-flex justify-content-between">
        {/* <div className="d-flex gap-3 align-items-center">
          <Calendar color={colors.primary} />
          <h6 className="text-lg font-bold text-blue-600">
            {`${months[viewing]} ${new Date().getFullYear()}`}
          </h6>
        </div> */}

        {/* <div className="d-flex gap-3">
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
        </div> */}
      </section>

      {/* Classes */}
      <section className="">
        {/* Tabs */}
        <Tab.Wrapper>
          {classTabs?.map((t, i) => {
            return (
              <Tab
                key={t}
                tabColor="#289483"
                isSelected={currentClass === t}
                onClick={() => setClas(i)}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        {/* Class List */}
        <div>
          {classes ? (
            classes
              ?.filter?.((c: any, i: number) => i <= 4)
              .map((clas: any, i: number) => {
                return (
                  <Link key={i} to={`/student/lecture/${clas?.id}`}>
                    <UpcomingEvent
                      title={clas?.name}
                      endDate={new Date(clas?.endTime)}
                      startDate={new Date(clas?.startTime)}
                    />
                  </Link>
                );
              })
          ) : (
            <p>No Classes yet...</p>
          )}
        </div>
      </section>
    </>
  );
}
